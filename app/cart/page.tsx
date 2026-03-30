"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCartStore();
  const [loading, setLoading] = useState(false);
  const subtotal = total();
  const itemCount = count();
  const shipping = subtotal >= 50 ? 0 : 4.95;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center container-px">
        <p className="text-6xl mb-4">🛍</p>
        <h1 className="font-black text-2xl tracking-tighter mb-2">Je winkelmand is leeg</h1>
        <p className="text-neutral-500 text-sm mb-6">Voeg producten toe om door te gaan</p>
        <Link href="/" className="bg-neutral-900 hover:bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
          Verder winkelen
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px max-w-6xl mx-auto py-12">
      <h1 className="font-black text-3xl tracking-tighter mb-8">Winkelmand ({itemCount})</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-4">
          {items.map(({ product: p, quantity }) => (
            <div key={p.id} className="flex gap-4 p-4 border border-neutral-100 rounded-xl bg-white">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 relative flex-shrink-0">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-400 font-semibold mb-0.5">{p.brand}</p>
                <p className="font-semibold text-sm leading-snug mb-2 line-clamp-2">{p.name}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(p.id, quantity - 1)} className="w-8 h-8 text-lg font-medium hover:bg-neutral-100 transition-colors">−</button>
                    <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                    <button onClick={() => updateQty(p.id, quantity + 1)} className="w-8 h-8 text-lg font-medium hover:bg-neutral-100 transition-colors">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black">€{(p.price * quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(p.id)} className="text-neutral-300 hover:text-red-500 transition-colors text-lg">×</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-neutral-50 rounded-2xl p-6 h-fit sticky top-20">
          <h2 className="font-black text-lg tracking-tight mb-5">Overzicht</h2>
          <div className="space-y-3 text-sm mb-5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Subtotaal</span>
              <span className="font-bold">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Verzending</span>
              <span className={`font-bold ${shipping === 0 ? "text-green-600" : ""}`}>
                {shipping === 0 ? "Gratis 🎉" : `€${shipping.toFixed(2)}`}
              </span>
            </div>
            {subtotal < 50 && <p className="text-xs text-neutral-400">Nog €{(50 - subtotal).toFixed(2)} voor gratis verzending 🚚</p>}
            <div className="border-t border-neutral-200 pt-3 flex justify-between font-black text-base">
              <span>Totaal</span>
              <span>€{(subtotal + shipping).toFixed(2)}</span>
            </div>
          </div>
          <button onClick={handleCheckout} disabled={loading}
            className="w-full bg-neutral-900 hover:bg-brand text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl transition-colors disabled:opacity-60">
            {loading ? "Laden…" : "Afrekenen via Stripe →"}
          </button>
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {["iDEAL","Visa","MC","PayPal"].map((m) => (
              <span key={m} className="text-[10px] font-bold text-neutral-400 border border-neutral-200 rounded px-2 py-0.5">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
