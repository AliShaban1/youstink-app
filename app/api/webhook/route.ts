import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendSMS } from "@/lib/twilio";
import { findMessage } from "@/lib/messages";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { messageId, phone, note } = session.metadata || {};

    if (!messageId || !phone) {
      console.error("Missing metadata in session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const message = findMessage(messageId);
    if (!message) {
      console.error("Message not found:", messageId);
      return NextResponse.json({ error: "Message not found" }, { status: 400 });
    }

    // Build the SMS body
    let smsBody = `${message.text}`;
    if (note) {
      smsBody += `\n\n"${note}"`;
    }
    smsBody += `\n\n— Sent anonymously via YouStink.app`;

    try {
      const sid = await sendSMS(`+${phone}`, smsBody);
      console.log("SMS sent:", sid, "to:", phone);
    } catch (err: any) {
      console.error("SMS send failed:", err.message);
      // Payment already captured — log the error for manual retry
      // In production, you'd want a queue/retry system here
    }
  }

  return NextResponse.json({ received: true });
}
