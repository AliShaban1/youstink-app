# YouStink.app

> Tell someone they stink. Anonymously. $0.50 per nudge via SMS.

A minimal, funny anonymous hygiene nudge service. Users pick a vibe (funny or kind), choose a pre-written message, enter a phone number, pay $0.99 via Stripe (Apple Pay / Google Pay supported), and an anonymous SMS gets sent via Twilio.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React
- **Payments**: Stripe Checkout (supports Apple Pay & Google Pay)
- **SMS**: Twilio
- **Hosting**: Vercel

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
