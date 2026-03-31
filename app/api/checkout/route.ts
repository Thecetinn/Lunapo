import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json();
    if (!items?.length) return NextResponse.json({ error: "Lege winkelmand" }, { status: 400 });

    const Stripe = require("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const total = items.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.product.name },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lunapo.vercel.app"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lunapo.vercel.app"}/cancel`,
      locale: "nl",
    });

    // Siparişi Supabase'e kaydet
    if (userId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      await supabase.from("orders").insert({
        user_id: userId,
        stripe_session_id: session.id,
        items: items,
        total: total,
        status: "paid",
        type: "shop",
      });
    }

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
