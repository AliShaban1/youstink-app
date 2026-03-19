# YouStink.app

> Tell someone they stink. Anonymously. $0.99 per nudge via SMS.

A minimal, funny anonymous hygiene nudge service. Users pick a vibe (funny or kind), choose a pre-written message, enter a phone number, pay $0.99 via Stripe (Apple Pay / Google Pay supported), and an anonymous SMS gets sent via Twilio.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React
- **Payments**: Stripe Checkout (supports Apple Pay & Google Pay)
- **SMS**: Twilio
- **Hosting**: Vercel (recommended)

## Setup

### 1. Clone & Install

```bash
git clone <your-repo>
cd youstink-app
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

You'll need:

#### Stripe
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your **Secret Key** and **Publishable Key** from Developers → API Keys
3. Enable **Apple Pay** and **Google Pay** in Settings → Payment Methods
4. Set up a webhook (see step 4 below)

#### Twilio
1. Go to [twilio.com/console](https://www.twilio.com/console)
2. Get your **Account SID** and **Auth Token**
3. Buy a phone number (~$1.15/month) — this is the "from" number for SMS

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Set Up Stripe Webhook

The webhook is what triggers the SMS after a successful payment.

**For local development:**
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/webhook
```
Copy the webhook signing secret it gives you into `STRIPE_WEBHOOK_SECRET`.

**For production (after deploying to Vercel):**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://youstink.app/api/webhook`
3. Listen for event: `checkout.session.completed`
4. Copy the signing secret to your Vercel env vars

### 5. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new).

Add all env variables in Vercel Dashboard → Settings → Environment Variables.

Set `NEXT_PUBLIC_BASE_URL` to your production URL (e.g. `https://youstink.app`).

### 6. Custom Domain

Buy `youstink.app` (or similar) from a registrar and add it in Vercel → Settings → Domains.

## How It Works

```
User picks vibe → picks message → enters phone number
  → clicks "Pay $0.99 & send"
  → redirected to Stripe Checkout (Apple Pay / Google Pay / card)
  → payment succeeds
  → Stripe sends webhook to /api/webhook
  → webhook triggers Twilio SMS to recipient
  → user redirected back to success screen
```

## Costs Per Transaction

| Item | Cost |
|------|------|
| Revenue | $0.99 |
| Stripe fee (2.9% + $0.30) | -$0.33 |
| Twilio SMS | -$0.008 |
| **Your profit** | **~$0.65** |

## File Structure

```
youstink-app/
├── app/
│   ├── layout.tsx          # Root layout + meta tags
│   ├── page.tsx            # Main app UI (all steps)
│   ├── globals.css         # Global styles
│   ├── success/page.tsx    # Stripe redirect handler
│   └── api/
│       ├── create-checkout/route.ts  # Creates Stripe session
│       └── webhook/route.ts          # Handles payment → sends SMS
├── components/
│   └── illustrations.tsx   # SVG nose & icon components
├── lib/
│   ├── messages.ts         # Message data (shared client/server)
│   ├── stripe.ts           # Stripe client
│   └── twilio.ts           # Twilio SMS helper
├── .env.example
├── package.json
└── README.md
```
