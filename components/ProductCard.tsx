"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/products";
import { useState } from "react";

const BADGE: Record<string, string> = {
  Nieuw: "bg-neutral-900 text-white",
  Hot: "bg-brand text-white",
  Sale: "bg-red-600 text-white",
  Bestseller: "bg-violet-700 text-white",
  Limited: "bg-amber-600 text-white",
};

export default function ProductCard({ product: p }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const disc = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-3">
        <Image src={p.images[0]} alt={p.name} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 25vw" />
        {p.badge && (
          <span className={`absolute top-2.5 left-2.5 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded ${BADGE[p.badge] || "bg-neutral-900 text-white"}`}>
            {p.badge}
          </span>
        )}
        {p.stock <= 5 && (
          <span className="absolute top-2.5 right-2.5 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded">
            Nog {p.stock}
          </span>
        )}
      </div>
      <p className="text-[11px] text-neutral-400 font-semibold mb-0.5">{p.brand}</p>
      <p className="font-semibold text-sm leading-snug text-neutral-900 mb-2 line-clamp-2">{p.name}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="font-black text-base">€{p.price.toFixed(2)}</span>
          {p.comparePrice && <span className="text-neutral-300 line-through text-xs">€{p.comparePrice.toFixed(2)}</span>}
          {disc > 0 && <span className="text-brand text-xs font-bold">-{disc}%</span>}
        </div>
        <button onClick={handleAdd}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${added ? "bg-green-600 text-white" : "bg-neutral-900 hover:bg-brand text-white"}`}>
          {added ? "✓" : "+"}
        </button>
      </div>
    </Link>
  );
}
