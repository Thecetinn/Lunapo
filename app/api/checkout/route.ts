import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-11-20.acacia" });

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    if (!items?.length) return NextResponse.json({ error: "Lege winkelmand" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.product.name, images: [item.product.images[0]] },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      shipping_address_collection: { allowed_countries: ["NL", "DE"] },
      locale: "nl",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
