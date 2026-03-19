import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { findMessage } from "@/lib/messages";

export async function POST(req: NextRequest) {
  try {
    const { messageId, phone, note } = await req.json();

    // Validate
    const message = findMessage(messageId);
    if (!message) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // Apple Pay & Google Pay are enabled automatically 
      // when you turn them on in Stripe Dashboard → Settings → Payment Methods
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Stink Nudge",
              description: `Anonymous SMS: "${message.short}"`,
            },
            unit_amount: 50, // $0.50 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?cancelled=true`,
      metadata: {
        messageId,
        phone: cleanPhone,
        note: note || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
