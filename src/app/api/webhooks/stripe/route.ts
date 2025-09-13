import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Initialize Supabase with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`⚠️  Webhook signature verification failed.`, errorMessage);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  console.log(`🔔 Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook: ${error}`);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Handle successful checkout - user becomes Pro
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log("✅ Checkout completed:", session.id);

  if (session.mode !== "subscription" || !session.customer_email) {
    console.log("Not a subscription checkout, skipping");
    return;
  }

  // Find user by email
  const { data: { users } } = await supabase.auth.admin.listUsers();
  const user = users.find((u) => u.email === session.customer_email);

  if (!user) {
    console.error(`User not found for email: ${session.customer_email}`);
    return;
  }

  // Create subscription record
  const subscriptionData = {
    user_id: user.id,
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: session.subscription as string,
    status: "active",
    plan_type: "pro",
    current_period_start: null,
    current_period_end: null,
    cancel_at_period_end: false,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("user_subscriptions")
    .upsert(subscriptionData, { onConflict: "stripe_subscription_id" });

  if (error) {
    console.error("Failed to create subscription:", error);
    throw error;
  }

  console.log(`✅ User ${user.email} upgraded to Pro`);
}

// Handle subscription changes (downgrades, etc.)
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("📝 Subscription updated:", subscription.id);

  // User remains Pro if subscription is active, even if it's set to cancel at period end
  const planType = subscription.status === "active" ? "pro" : "free";

  const { error } = await supabase
    .from("user_subscriptions")
    .update({
      status: subscription.status,
      plan_type: planType,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }

  console.log(`✅ Subscription ${subscription.id} updated - status: ${subscription.status}, plan: ${planType}, cancel_at_period_end: ${subscription.cancel_at_period_end}`);
}

// Handle subscription cancellation - user becomes Free
async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log("❌ Subscription canceled:", subscription.id);

  const { error } = await supabase
    .from("user_subscriptions")
    .update({
      status: "canceled",
      plan_type: "free",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Failed to cancel subscription:", error);
    throw error;
  }

  console.log(`✅ Subscription ${subscription.id} canceled - user downgraded to Free`);
}

// Handle failed payments - give grace period before downgrading
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log("💳 Payment failed for invoice:", invoice.id);

  // Get the customer's subscription via customer ID
  const subscriptions = await stripe.subscriptions.list({
    customer: invoice.customer as string,
    status: 'active',
    limit: 1
  });

  if (subscriptions.data.length === 0) {
    console.log("No active subscription found for customer");
    return;
  }

  const subscriptionId = subscriptions.data[0].id;

  // Update subscription status to past_due (keeps Pro access for grace period)
  const { error } = await supabase
    .from("user_subscriptions")
    .update({
      status: "past_due",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscriptionId);

  if (error) {
    console.error("Failed to update subscription status:", error);
    throw error;
  }

  console.log(`⚠️ Subscription ${subscriptionId} marked as past_due (grace period)`);
}