"use client";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handle = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex gap-3 items-stretch">
      <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-11 h-11 text-xl font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">−</button>
        <span className="w-10 text-center font-bold">{qty}</span>
        <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          className="w-11 h-11 text-xl font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">+</button>
      </div>
      <button onClick={handle}
        className={`flex-1 font-black text-sm uppercase tracking-widest py-3 rounded-xl transition-colors ${added ? "bg-green-600 text-white" : "bg-neutral-900 hover:bg-brand text-white"}`}>
        {added ? "✓ Toegevoegd!" : "In winkelmand"}
      </button>
    </div>
  );
}
