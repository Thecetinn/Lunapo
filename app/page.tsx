"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { CATEGORIES, getFeaturedProducts, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const TRUST = [
  ["🚚","Gratis verzending","Vanaf €50 in NL & DE"],
  ["↩","30 dagen retour","Zorgeloos retourneren"],
  ["🔒","Veilig betalen","Stripe & iDEAL"],
  ["📦","Toploader verpakt","Kaarten altijd veilig"],
];

const SLIDES = [
  { bg:"https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=1600&q=80", badge:"Officiële Partner", title:"Mythos Cards", subtitle:"Premium voetbalkaarten rechtstreeks van onze officiële partner.", cta:{ label:"Bekijk collectie", href:"/category/soccer-cards" } },
  { bg:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80", badge:"Officieel", title:"Topps Collectibles", subtitle:"Chrome, Gold Label & Match Attax — geselecteerde edities bij Lunapo.", cta:{ label:"Shop Topps", href:"/category/single-card" } },
  { bg:"https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=1600&q=80", badge:"Pokémon TCG", title:"Trading Cards", subtitle:"Scarlet & Violet, Obsidian Flames en meer — direct leverbaar.", cta:{ label:"Shop Pokémon", href:"/category/pokemon" } },
  { bg:"https://images.unsplash.com/photo-1584592487914-a29c64f25887?w=1600&q=80", badge:"Premium", title:"Elite Collectibles", subtitle:"Zeldzame kaarten in topstaat. Veilig verpakt, snel bezorgd.", cta:{ label:"Ontdek meer", href:"/category/single-card" } },
];

function HeroSlider() {
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

      {/* Digitale Breaks — sol üst */}
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

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const pokemon = getProductsByCategory("pokemon").slice(0, 4);
  return (
    <>
      <HeroSlider />

      <section className="container-px max-w-7xl mx-auto py-20">
        <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">Shop per categorie</p>
        <h2 className="font-black text-3xl md:text-4xl tracking-tighter mb-10">Wat zoek je?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group relative aspect-[3/2] rounded-xl overflow-hidden">
              <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="16vw"/>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors"/>
              <div className="absolute inset-0 flex items-end p-3">
                <p className="text-white font-black text-xs tracking-wide">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-1">Uitgelicht</p>
            <h2 className="font-black text-3xl tracking-tighter">Meest gewild</h2>
          </div>
          <Link href="/category/soccer-cards" className="text-sm font-bold border-b-2 border-neutral-900 pb-0.5 hover:border-brand hover:text-brand transition-colors">Alles bekijken →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto pb-20">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-950 min-h-[300px] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage:"url('https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=1400&q=80')"}}/>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="relative px-10 py-14">
            <span className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded mb-4 inline-block">Nu op voorraad</span>
            <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter max-w-lg leading-tight mb-4">Pokémon Obsidian Flames</h2>
            <p className="text-white/50 text-sm mb-7 max-w-sm leading-relaxed">Charizard ex ultra rare. Direct leverbaar in NL & DE.</p>
            <Link href="/category/pokemon" className="bg-white text-neutral-900 font-black text-xs uppercase tracking-widest px-7 py-3.5 rounded hover:bg-brand hover:text-white transition-colors">Shop Pokémon</Link>
          </div>
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto pb-20">
        <div className="bg-neutral-950 rounded-2xl p-10 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <span className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded mb-3 inline-block">B2B Wholesale</span>
            <h2 className="text-white font-black text-2xl tracking-tighter mb-1">Retailer of groothandelaar?</h2>
            <p className="text-white/40 text-sm">Tot 35% korting · min. €500 · 30d betaaltermijn · NL factuur</p>
          </div>
          <Link href="/b2b" className="bg-brand hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest px-7 py-3.5 rounded transition-colors whitespace-nowrap">B2B aanvragen →</Link>
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-black text-3xl tracking-tighter">Pokémon TCG — nieuw</h2>
          <Link href="/category/pokemon" className="text-sm font-bold border-b-2 border-neutral-900 pb-0.5 hover:border-brand hover:text-brand transition-colors">Alles →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {pokemon.map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto pb-20">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
          <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent" />
          <div className="relative flex flex-wrap items-center justify-between gap-6 p-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎴</span>
                <span className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Nieuw</span>
              </div>
              <h2 className="text-white font-black text-3xl tracking-tighter mb-2">Digitale Breaks</h2>
              <p className="text-white/40 text-sm max-w-sm">Kies een tier, open 3 packs live op je scherm. Geen wachttijd, direct resultaat.</p>
              <div className="flex gap-3 mt-4">
                {["€15","€45","€90"].map(p => (
                  <span key={p} className="border border-white/20 text-white/60 text-xs font-bold px-3 py-1.5 rounded-lg">{p}</span>
                ))}
              </div>
            </div>
            <Link href="/breaks" className="bg-white text-neutral-900 font-black text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-brand hover:text-white transition-colors whitespace-nowrap">
              Start een break →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 border-t border-neutral-800">
        <div className="container-px max-w-7xl mx-auto py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {TRUST.map(([icon, title, sub]) => (
            <div key={title}>
              <div className="text-2xl mb-3">{icon}</div>
              <p className="font-bold text-sm text-white">{title}</p>
              <p className="text-xs text-white/40 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
