# Missing Subscription Features for Drippler

## 🚨 Critical (Must Have)

### 1. Cancel Subscription
**Where:** Profile modal "Cancel Subscription" button
**API Needed:**
- `POST /api/subscription/cancel`
- Calls `stripe.subscriptions.update(sub_id, { cancel_at_period_end: true })`
- Updates local database status

### 2. Payment Failure Handling
**Current Issue:** If user's card expires/fails, they keep Pro access indefinitely
**Fix Needed:**
- Handle `invoice.payment_failed` webhook (you have this)
- Set grace period (3-7 days) before downgrading to free
- Email user about payment failure
- Provide "Update Payment Method" flow

### 3. Update Payment Method
**Where:** Profile modal "Update Payment" button
**API Needed:**
- Create Stripe Customer Portal session
- `POST /api/stripe/create-portal-session`
- Redirects to Stripe-hosted billing portal

## ⚠️ Important (Should Have)

### 4. Subscription Details View
**Current:** Only shows "Pro" badge and generation count
**Missing:**
- Next billing date
- Amount charged
- Current period remaining
- Cancel date (if canceling at period end)

### 5. Billing History
**Where:** Profile modal "Billing History" section
**Show:** Past invoices, amounts, dates, download receipts

### 6. Admin Panel (for you)
**Needed for customer support:**
- View user subscriptions
- Manual subscription overrides
- Refund processing
- User generation usage analytics

## 💡 Nice to Have

### 7. Email Notifications
- Welcome email after successful subscription
- Payment failure notifications
- Subscription canceled notifications
- Billing reminder emails

### 8. Proration Handling
- If you add multiple plan tiers later
- Mid-cycle plan changes
- Refund calculations

### 9. Team/Organization Plans
- Multiple users per subscription
- Usage sharing across team members

## 🛠️ Quick Implementation Priority

### Week 1: Critical Features
1. **Cancel Subscription** (2-3 hours)
2. **Payment Failure Grace Period** (2-3 hours)
3. **Update Payment Method** (1-2 hours)

### Week 2: Important Features
4. **Subscription Details View** (2-3 hours)
5. **Billing History** (3-4 hours)

### Week 3: Admin Features
6. **Basic Admin Panel** (1-2 days)

## 📝 Code Examples Needed

### Cancel Subscription API
```typescript
// /api/subscription/cancel
export async function POST(req: NextRequest) {
  // Get user subscription
  // Call stripe.subscriptions.update(id, { cancel_at_period_end: true })
  // Update database
  // Return success
}
```

### Customer Portal (Easiest Solution)
```typescript
// /api/stripe/create-portal-session
const portalSession = await stripe.billingPortal.sessions.create({
  customer: customer_id,
  return_url: 'https://yourapp.com/account',
});
// Redirect user to portalSession.url
```

This gives users a Stripe-hosted page to:
- Update payment methods
- View billing history
- Cancel subscriptions
- Download invoices
- Everything else automatically!

## 🎯 Recommendation

**Start with Stripe Customer Portal** - it handles 80% of subscription management automatically with minimal code. Then add custom features as needed.