import Link from "next/link";
import Image from "next/image";
import { getAllCategories, getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";

export const revalidate = 60;

const TRUST = [
  ["🚚","Gratis verzending","Vanaf €50 in NL & DE"],
  ["↩","30 dagen retour","Zorgeloos retourneren"],
  ["🔒","Veilig betalen","Stripe & iDEAL"],
  ["📦","Toploader verpakt","Kaarten altijd veilig"],
];

export default async function HomePage() {
  const [categories, allProducts] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  const featured = allProducts.filter(p => p.badge).slice(0, 4);
  const pokemon  = allProducts.filter(p => p.categorySlug === "pokemon" || p.category?.slug === "pokemon").slice(0, 4);

  return (
    <>
      <HeroSlider />

      <section className="container-px max-w-7xl mx-auto py-20">
        <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">Shop per categorie</p>
        <h2 className="font-black text-3xl md:text-4xl tracking-tighter mb-10">Wat zoek je?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="group relative aspect-[3/2] rounded-xl overflow-hidden">
              {c.image && (
                <Image src={c.image} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="16vw" />
              )}
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
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
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
          {pokemon.map((p) => <ProductCard key={p.id} product={p} />)}
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
