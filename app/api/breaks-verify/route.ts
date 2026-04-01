import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ valid: false });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ valid: false });
    }

    const tierId = session.metadata?.tier_id;
    if (!tierId) return NextResponse.json({ valid: false });

    return NextResponse.json({ valid: true, tierId });
  } catch (err: any) {
    console.error("Stripe verify error:", err.message);
    return NextResponse.json({ valid: false });
  }
}
