"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  { bg:"https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=1600&q=80", badge:"Officiële Partner", title:"Mythos Cards", subtitle:"Premium voetbalkaarten rechtstreeks van onze officiële partner.", cta:{ label:"Bekijk collectie", href:"/category/soccer-cards" } },
  { bg:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80", badge:"Officieel", title:"Topps Collectibles", subtitle:"Chrome, Gold Label & Match Attax — geselecteerde edities bij Lunapo.", cta:{ label:"Shop Topps", href:"/category/single-card" } },
  { bg:"https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=1600&q=80", badge:"Pokémon TCG", title:"Trading Cards", subtitle:"Scarlet & Violet, Obsidian Flames en meer — direct leverbaar.", cta:{ label:"Shop Pokémon", href:"/category/pokemon" } },
  { bg:"https://images.unsplash.com/photo-1584592487914-a29c64f25887?w=1600&q=80", badge:"Premium", title:"Elite Collectibles", subtitle:"Zeldzame kaarten in topstaat. Veilig verpakt, snel bezorgd.", cta:{ label:"Ontdek meer", href:"/category/single-card" } },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = useCallback(() => setCur(i => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCur(i => (i - 1 + SLIDES.length) % SLIDES.length), []);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [paused, next]);
  const s = SLIDES[cur];

  return (
    <section className="relative min-h-[92vh] bg-neutral-950 flex items-end overflow-hidden"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms]"
          style={{ backgroundImage:`url('${slide.bg}')`, opacity: i === cur ? 0.28 : 0 }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

      <div className="absolute top-6 left-6 z-20">
        <Link href="/breaks"
          className="flex items-center gap-3 bg-black/60 backdrop-blur-sm border border-white/20 hover:border-brand hover:bg-brand/20 transition-all rounded-xl px-4 py-3">
          <span className="text-xl">🎴</span>
          <div>
            <p className="text-white font-black text-sm leading-none tracking-tight">Digitale Breaks</p>
            <p className="text-white/50 text-[10px] font-semibold mt-1">€15 · €45 · €90</p>
          </div>
          <span className="text-white/40 text-xs ml-1">→</span>
        </Link>
      </div>

      <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-sm">‹</button>
      <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-sm">›</button>

      <div className="relative container-px max-w-7xl mx-auto py-24 md:py-32 w-full">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-white/75 font-semibold tracking-widest uppercase">{s.badge}</span>
        </div>
        <h1 className="text-white font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-6 max-w-3xl">
          {s.title.split(" ").map((w, i, arr) =>
            i === arr.length - 1 ? <span key={i} className="text-brand">{w}</span> : <span key={i}>{w} </span>
          )}
        </h1>
        <p className="text-white/50 text-base max-w-md leading-relaxed mb-10">{s.subtitle}</p>
        <div className="flex gap-3 flex-wrap items-center">
          <Link href={s.cta.href} className="bg-white text-neutral-900 font-black text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-brand hover:text-white transition-colors">
            {s.cta.label}
          </Link>
          <div className="flex gap-2 ml-4">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCur(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === cur ? "bg-white w-8" : "bg-white/30 w-4 hover:bg-white/50"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
