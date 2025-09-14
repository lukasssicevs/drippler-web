import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_email } = body;

    const session = await stripe.checkout.sessions.create({
      customer_email: customer_email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Drippler Pro",
              description: "200 virtual clothing try-on generations per month",
            },
            unit_amount: 999,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `https://drippler-web.vercel.app/success`,
      cancel_url: `https://drippler-web.vercel.app/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
