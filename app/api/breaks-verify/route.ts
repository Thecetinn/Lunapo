import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ valid: false });

  // Önce DB'ye bak
  const { data } = await supabase
    .from("break_sessions")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .in("status", ["paid", "pending"])
    .single();

  if (!data) return NextResponse.json({ valid: false });

  // DB pending ise Stripe'dan direkt kontrol et
  if (data.status === "pending") {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ valid: false });
    }
    // Stripe'da ödendi, DB'yi güncelle
    await supabase.from("break_sessions")
      .update({ status: "paid" })
      .eq("stripe_session_id", sessionId);
  }

  // Kullanıldı olarak işaretle
  await supabase.from("break_sessions")
    .update({ status: "used" })
    .eq("stripe_session_id", sessionId);

  return NextResponse.json({ valid: true, tierId: data.tier_id });
}
