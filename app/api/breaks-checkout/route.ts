import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const TIERS: Record<string, { label: string; price: number }> = {
  "15": { label: "Starter Break",  price: 1500 },
  "45": { label: "Premium Break",  price: 4500 },
  "90": { label: "Elite Break",    price: 9000 },
};
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TIERS: Record<string, { label: string; price: number }> = {
  "15": { label: "Starter Break",  price: 1500 },
  "45": { label: "Premium Break",  price: 4500 },
  "90": { label: "Elite Break",    price: 9000 },
};

export async function POST(req: NextRequest) {
  const { tierId } = await req.json();
  const tier = TIERS[tierId];
  if (!tier) return NextResponse.json({ error: "Invalid tier" }, { status: 400 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    metadata: { tier_id: tierId },
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: tier.price,
        product_data: {
          name: `Lunapo Digitale Break — ${tier.label}`,
          description: "3 packs · direct openen na betaling",
        },
      },
    }],
    success_url: `${siteUrl}/breaks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${siteUrl}/breaks`,
  });

  // DB'ye pending kayıt düş
  await supabase.from("break_sessions").insert({
    stripe_session_id: session.id,
    tier_id: tierId,
    status: "pending",
  });

  return NextResponse.json({ url: session.url });
}
export async function POST(req: NextRequest) {
  const { tierId } = await req.json();
  const tier = TIERS[tierId];
  if (!tier) return NextResponse.json({ error: "Invalid tier" }, { status: 400 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: tier.price,
          product_data: {
            name: `Lunapo Digitale Break — ${tier.label}`,
            description: "3 packs · direct openen na betaling",
          },
        },
      },
    ],
    success_url: `${siteUrl}/breaks?tier=${tierId}&paid=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${siteUrl}/breaks`,
  });

  return NextResponse.json({ url: session.url });
}
