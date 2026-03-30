import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-24">
      <div className="container-px max-w-7xl mx-auto py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-black text-2xl tracking-tighter mb-3">
            LUNAPO<span className="text-brand">.</span>
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed mb-4">
            Premium collectibles voor NL en DE.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["iDEAL", "Visa", "MC", "PayPal", "Klarna"].map((m) => (
              <span key={m} className="text-[10px] font-bold text-neutral-500 border border-neutral-800 rounded px-2 py-1">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4">Shop</p>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={"/category/" + c.slug}
              className="block text-sm text-neutral-400 hover:text-white mb-2.5 transition-colors">
              {c.name}
            </Link>
          ))}
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4">Info</p>
          <a href="#" className="block text-sm text-neutral-400 hover:text-white mb-2.5">Over ons</a>
          <a href="#" className="block text-sm text-neutral-400 hover:text-white mb-2.5">Verzending</a>
          <a href="#" className="block text-sm text-neutral-400 hover:text-white mb-2.5">Retourneren</a>
          <a href="#" className="block text-sm text-neutral-400 hover:text-white mb-2.5">Contact</a>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-4">B2B</p>
          <Link href="/b2b" className="block text-sm text-neutral-400 hover:text-white mb-2.5">Wholesale</Link>
          <Link href="/b2b" className="block text-sm text-neutral-400 hover:text-white mb-2.5">Aanvragen</Link>
        </div>
      </div>

      <div className="border-t border-neutral-900">
        <div className="container-px max-w-7xl mx-auto py-4 flex justify-between flex-wrap gap-2 text-xs text-neutral-600">
          <span>2025 Lunapo Toys B.V.</span>
        </div>
      </div>

      <a href="https://wa.me/31600000000" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full text-xs font-bold shadow-lg hover:opacity-90 transition-opacity">
        WhatsApp
      </a>
    </footer>
  );
}