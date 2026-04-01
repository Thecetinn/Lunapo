import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories, getCategoryBySlugAsync, getProductsByCategoryAsync } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlugAsync(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} kopen`,
    description: `Koop officiële ${cat.name} bij Lunapo. ${cat.description}. Snelle bezorging NL & DE.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [cat, products, allCategories] = await Promise.all([
    getCategoryBySlugAsync(slug),
    getProductsByCategoryAsync(slug),
    getAllCategories(),
  ]);

  if (!cat) notFound();

  return (
    <>
      <div className="relative h-52 md:h-64 bg-neutral-950 overflow-hidden">
        {cat.image && (
          <Image src={cat.image} alt={cat.name} fill className="object-cover opacity-35" priority />
        )}
        <div className="relative container-px max-w-7xl mx-auto h-full flex flex-col justify-end pb-8">
          <nav className="flex gap-2 text-xs text-white/50 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">{cat.name}</span>
          </nav>
          <h1 className="text-white font-black text-3xl md:text-4xl tracking-tighter">{cat.name}</h1>
          <p className="text-white/50 text-sm mt-1">{products.length} producten</p>
        </div>
      </div>
      <div className="container-px max-w-7xl mx-auto py-12">
        {products.length === 0
          ? <p className="text-neutral-400 text-center py-20">Geen producten gevonden.</p>
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
        }
        <div className="mt-16 pt-12 border-t border-neutral-100">
          <p className="text-sm font-bold text-neutral-500 mb-4">Bekijk ook:</p>
          <div className="flex gap-2 flex-wrap">
            {allCategories.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}
                className="text-sm border border-neutral-200 rounded-full px-4 py-1.5 hover:border-brand hover:text-brand transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
