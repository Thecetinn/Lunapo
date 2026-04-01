import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getProductBySlugAsync, getRelatedProductsAsync, getCategoryBySlugAsync } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlugAsync(slug);
  if (!p) return {};
  return {
    title: `${p.name} kopen`,
    description: p.description,
    openGraph: {
      title: p.name,
      images: p.images?.length ? [{ url: p.images[0] }] : p.image_url ? [{ url: p.image_url }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlugAsync(slug);
  if (!p) notFound();

  const catSlug = p.categorySlug ?? p.category?.slug ?? '';
  const [cat, related] = await Promise.all([
    getCategoryBySlugAsync(catSlug),
    getRelatedProductsAsync(p, 4),
  ]);

  const mainImage = p.images?.[0] ?? p.image_url ?? '';
  const disc = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    brand: { "@type": "Brand", name: p.brand ?? "Lunapo" },
    image: p.images ?? [p.image_url],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: p.price.toFixed(2),
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Lunapo" },
    },
    ...(p.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        reviewCount: p.reviewCount,
        bestRating: 5,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-px max-w-7xl mx-auto py-8">
        <nav className="flex gap-2 text-xs text-neutral-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${catSlug}`} className="hover:text-brand transition-colors">{cat?.name}</Link>
          <span>/</span>
          <span className="text-neutral-600 font-medium truncate max-w-[200px]">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-3 relative">
              {mainImage && (
                <Image src={mainImage} alt={p.name} fill className="object-cover" priority sizes="50vw" />
              )}
            </div>
          </div>
          <div>
            {p.badge && (
              <span className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded mb-4 inline-block">{p.badge}</span>
            )}
            {p.stock <= 5 && p.stock > 0 && (
              <span className="ml-2 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded">⚡ Nog {p.stock}</span>
            )}
            <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest mt-3 mb-1">{p.brand}</p>
            <h1 className="font-black text-2xl md:text-3xl tracking-tight mb-4 leading-tight">{p.name}</h1>
            {p.rating && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-amber-400 text-sm">{"★".repeat(Math.floor(p.rating))}</span>
                <span className="font-bold text-sm">{p.rating}</span>
                <span className="text-neutral-400 text-sm">({p.reviewCount} beoordelingen)</span>
              </div>
            )}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-black text-4xl">€{p.price.toFixed(2)}</span>
              {p.comparePrice && (
                <>
                  <span className="text-neutral-300 line-through text-lg">€{p.comparePrice.toFixed(2)}</span>
                  <span className="bg-brand/10 text-brand text-sm font-bold px-2 py-0.5 rounded">-{disc}%</span>
                </>
              )}
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">{p.description}</p>
            {p.features && (
              <ul className="mb-8 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-green-600 font-bold">✓</span>{f}
                  </li>
                ))}
              </ul>
            )}
            <AddToCartButton product={p} />
            <p className="text-xs text-neutral-400 mt-4">🚚 Gratis verzending v.a. €50 &nbsp;·&nbsp; ↩ 30 dagen retour</p>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="font-black text-2xl tracking-tighter mb-6">Gerelateerde producten</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
