import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    if (!items?.length) return NextResponse.json({ error: "Lege winkelmand" }, { status: 400 });

    const Stripe = require("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

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

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
