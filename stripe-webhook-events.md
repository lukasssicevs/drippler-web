# Stripe Webhook Events Configuration

## Required Webhook Events for Drippler Subscription System

Configure these events in your Stripe Dashboard → Webhooks → Add endpoint:

**Webhook URL:** `https://0dc7fca4c118.ngrok-free.app/api/webhooks/stripe`

### ✅ Currently Implemented Events:

#### **Checkout & Subscription Creation**
- `checkout.session.completed` - When user completes payment checkout
- `customer.subscription.created` - When a new subscription is created

#### **Subscription Management**
- `customer.subscription.updated` - When subscription details change (plan, status, etc.)
- `customer.subscription.deleted` - When subscription is canceled/deleted

#### **Payment Processing**
- `invoice.payment_succeeded` - When recurring payment succeeds
- `invoice.payment_failed` - When payment fails (card declined, etc.)

### 🔧 Additional Recommended Events:

#### **Customer Management**
- `customer.created` - When new customer is created in Stripe
- `customer.updated` - When customer details change
- `customer.deleted` - When customer is deleted

#### **Payment Method Issues**
- `invoice.payment_action_required` - When payment requires additional authentication
- `customer.subscription.trial_will_end` - 3 days before trial ends (if you add trials)

#### **Subscription Lifecycle**
- `customer.subscription.paused` - When subscription is paused
- `customer.subscription.resumed` - When paused subscription resumes
- `customer.subscription.pending_update_applied` - When scheduled changes take effect
- `customer.subscription.pending_update_expired` - When scheduled update expires

#### **Dunning Management** (Failed Payment Recovery)
- `invoice.finalized` - Invoice is ready for payment
- `invoice.marked_uncollectible` - Invoice marked as bad debt
- `invoice.payment_action_required` - Payment needs user action

#### **Proration & Upgrades**
- `invoice.upcoming` - 7 days before next invoice (for notifications)
- `customer.subscription.schedule.created` - Subscription schedule created
- `customer.subscription.schedule.updated` - Subscription schedule updated

## 🚀 Stripe Dashboard Configuration

1. Go to **Stripe Dashboard** → **Webhooks**
2. Click **Add endpoint**
3. Enter endpoint URL: `https://0dc7fca4c118.ngrok-free.app/api/webhooks/stripe`
4. Select these events (copy from above)
5. Click **Add endpoint**
6. Copy the **Signing Secret** (starts with `whsec_`) to your `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_signing_secret_here
```

## 🧪 Testing Events

Use Stripe CLI to trigger test events:

```bash
# Test successful subscription creation
stripe trigger checkout.session.completed

# Test failed payment
stripe trigger invoice.payment_failed

# Test subscription cancellation
stripe trigger customer.subscription.deleted

# Listen to all events in real-time
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📝 Event Priority Levels

### **Critical (Must Handle)**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

### **Important (Should Handle)**
- `customer.created`
- `invoice.payment_action_required`
- `customer.subscription.trial_will_end`

### **Optional (Nice to Have)**
- `invoice.upcoming`
- `customer.subscription.paused`
- `customer.subscription.resumed`
- All other events listed above

## 🔍 Event Data Structure

Each webhook contains:
```json
{
  "id": "evt_...",
  "object": "event",
  "type": "customer.subscription.created",
  "data": {
    "object": {
      // The actual subscription, invoice, customer, etc.
    }
  },
  "created": 1234567890
}
```

## 🛡️ Security Notes

- Webhook signing secret validates requests come from Stripe
- Always verify webhook signatures before processing
- Use HTTPS endpoints only
- Consider implementing idempotency keys for duplicate events