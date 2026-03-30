"use client";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useState, useEffect } from "react";
import { CATEGORIES } from "@/lib/products";

export default function Navbar() {
  const count = useCartStore((s) => s.count)();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-brand text-white text-center py-2 text-xs font-semibold tracking-widest uppercase">
        🇳🇱 Gratis verzending v.a. €50 &nbsp;·&nbsp; 🇩🇪 Kostenloser Versand ab €50 &nbsp;·&nbsp; 📦 Kaarten in toploader
      </div>
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-shadow ${scrolled ? "shadow-sm border-neutral-200" : "border-neutral-100"}`}>
        <div className="container-px max-w-7xl mx-auto flex items-center justify-between h-14 gap-4">
          <Link href="/" className="font-black text-xl tracking-tighter text-neutral-900 flex-shrink-0">
            LUNAPO<span className="text-brand">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}
                className="text-xs font-semibold text-neutral-600 hover:text-brand hover:bg-neutral-50 px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                {c.name}
              </Link>
            ))}
            <Link href="/b2b"
              className="text-xs font-bold text-brand border border-brand px-3 py-2 rounded-lg hover:bg-brand hover:text-white transition-colors whitespace-nowrap ml-1">
              B2B
            </Link>
          </div>
          <Link href="/cart"
            className="relative flex items-center gap-2 bg-neutral-900 hover:bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex-shrink-0">
            🛒 Winkelwagen
            {mounted && count > 0 && (
              <span className="bg-brand text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}
