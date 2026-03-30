import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, getFeaturedProducts, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Lunapo | Premium Collectibles NL & DE",
  description: "Premium voetbalkaarten, Pokémon TCG, One Piece TCG, figuren en diecast. Gratis verzending v.a. €50.",
};

const TRUST = [["🚚","Gratis verzending","Vanaf €50 in NL & DE"],["↩","30 dagen retour","Zorgeloos"],["🔒","Veilig betalen","Stripe & iDEAL"],["📦","Toploader verpakt","Altijd veilig"],["⭐","4.9/5 beoordeeld","500+ klanten"]];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const pokemon = getProductsByCategory("pokemon").slice(0, 4);
  return (
    <>
      <section className="relative min-h-[88vh] bg-neutral-950 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{backgroundImage:"url('https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=1600&q=80')"}}/>
        <div className="relative container-px max-w-7xl mx-auto py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full"/>
            <span className="text-xs text-white/75 font-semibold tracking-widest uppercase">Collectie 2025 — Nieuw binnen</span>
          </div>
          <h1 className="text-white font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-6 max-w-2xl">
            Jouw collectie. <span className="text-brand">Jouw regels.</span>
          </h1>
          <p className="text-white/60 text-base max-w-md leading-relaxed mb-8">
            Premium voetbalkaarten, Pokémon, One Piece TCG, figuren en diecast. Bezorging in heel NL & DE.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/category/soccer-cards" className="bg-white text-neutral-900 font-black text-sm uppercase tracking-widest px-8 py-4 rounded hover:bg-brand hover:text-white transition-colors">Shop collectie</Link>
            <Link href="/category/pokemon" className="border border-white/30 text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded hover:bg-white/10 transition-colors">Pokémon TCG →</Link>
          </div>
        </div>
      </section>

      <section className="container-px max-w-7xl mx-auto py-20">
        <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">Shop per categorie</p>
        <h2 className="font-black text-3xl md:text-4xl tracking-tighter mb-10">Wat zoek je?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group relative aspect-[3/2] rounded-xl overflow-hidden">
              <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="16vw"/>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"/>
              <div className="absolute inset-0 flex items-end p-3">
                <p className="text-white font-black text-xs">{c.name}</p>
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
        <div className="relative rounded-2xl overflow-hidden bg-neutral-950 min-h-[320px] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{backgroundImage:"url('https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=1400&q=80')"}}/>
          <div className="relative container-px py-14">
            <span className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded mb-4 inline-block">Hot</span>
            <h2 className="text-white font-black text-4xl md:text-5xl tracking-tighter max-w-lg leading-tight mb-4">Pokémon Obsidian Flames — nu op voorraad</h2>
            <p className="text-white/60 text-sm mb-7 max-w-sm leading-relaxed">Charizard ex ultra rare. Direct leverbaar in NL & DE.</p>
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

      <section className="bg-neutral-50 border-t border-neutral-100">
        <div className="container-px max-w-7xl mx-auto py-12 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {TRUST.map(([icon,title,sub]) => (
            <div key={title}>
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-bold text-sm text-neutral-900">{title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
