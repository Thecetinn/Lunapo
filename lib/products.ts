import { createClient } from '@/lib/supabase'

// ─── TYPES ────────────────────────────────────────────────

export type Category = {
  id?: string
  slug: string
  name: string
  description: string
  image?: string
  created_at?: string
}

export type Product = {
  id: string
  slug: string
  name: string
  brand?: string
  description: string | null
  price: number
  compare_price?: number | null
  comparePrice?: number
  image_url?: string | null
  images?: string[]
  category_id?: string | null
  category?: Category
  categorySlug?: string
  stock: number
  is_active?: boolean
  badge?: string
  rating?: number
  reviewCount?: number
  features?: string[]
  created_at?: string
  updated_at?: string
}

// ─── STATIC FALLBACK (Navbar, Footer, vs. için) ───────────

export const CATEGORIES: Category[] = [
  { slug: 'pokemon',      name: 'Pokémon TCG',  description: 'Scarlet & Violet, Obsidian Flames', image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&q=80' },
  { slug: 'one-piece',    name: 'One Piece TCG', description: 'OP-01 t/m OP-07',                  image: 'https://images.unsplash.com/photo-1607704240476-18b5b2af7040?w=800&q=80' },
  { slug: 'soccer-cards', name: 'Soccer Cards',  description: 'Topps, Panini, Mythos',             image: 'https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=800&q=80' },
  { slug: 'figur',        name: 'Figür',         description: 'Anime & Gaming figürler',           image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { slug: 'diecast',      name: 'Diecast',       description: 'Schaalmodellen 1:18 & 1:43',        image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80' },
  { slug: 'single-card',  name: 'Single Card',   description: 'Losse premium kaarten',             image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80' },
]

export const PRODUCTS: Product[] = [
  { id:'p1',  slug:'arda-guler-panini-mosaic-2024',   name:'Arda Güler – Panini Mosaic RC 2024',      brand:'Panini',      categorySlug:'soccer-cards', price:29.95, images:['https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=800&q=80'], description:'Officiële Arda Güler rookie card uit de Panini Mosaic 2024 collectie.', features:['Near Mint conditie','Toploader inclusief','Gelimiteerde oplage'], badge:'Nieuw',       stock:12, rating:4.9, reviewCount:23 },
  { id:'p2',  slug:'haaland-topps-chrome-2024',       name:'Haaland – Topps Chrome Refractor 2024',   brand:'Topps',       categorySlug:'soccer-cards', price:24.95, comparePrice:34.95, images:['https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=800&q=80'], description:'Erling Haaland Topps Chrome refractor, PSA-ready conditie.', features:['Refractor finish','Graded klaar','Inclusief hoes'], badge:'Sale', stock:5, rating:4.8, reviewCount:41 },
  { id:'p3',  slug:'mbappe-panini-prizm-2024',        name:'Mbappé – Panini Prizm Real Madrid 2024',  brand:'Panini',      categorySlug:'soccer-cards', price:34.95, images:['https://images.unsplash.com/photo-1551958219-acbc595bfd2b?w=800&q=80'], description:'Mbappé Prizm — zijn eerste officiële Real Madrid kaart.', features:['Real Madrid debuut','Prizm finish','Schaars'], badge:'Bestseller', stock:3, rating:5.0, reviewCount:67 },
  { id:'p4',  slug:'charizard-ex-obsidian-flames',    name:'Charizard ex – Obsidian Flames UR',       brand:'Pokémon TCG', categorySlug:'pokemon',      price:89.95, images:['https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&q=80'], description:'Charizard ex ultra rare uit Obsidian Flames. PSA-ready conditie.', features:['Ultra Rare','PSA-ready','Sealed booster'], badge:'Hot', stock:2, rating:5.0, reviewCount:89 },
  { id:'p5',  slug:'pikachu-v-paldea-evolved',        name:'Pikachu V Full Art – Paldea Evolved',     brand:'Pokémon TCG', categorySlug:'pokemon',      price:14.95, images:['https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&q=80'], description:'Pikachu V full art kaart uit Paldea Evolved.', features:['Full Art kaart','Paldea Evolved','Starters favoriet'], badge:'Nieuw', stock:15, rating:4.7, reviewCount:34 },
  { id:'p6',  slug:'mewtwo-ex-special-illustration',  name:'Mewtwo ex – Special Illustration Rare',   brand:'Pokémon TCG', categorySlug:'pokemon',      price:44.95, comparePrice:54.95, images:['https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&q=80'], description:'Mewtwo ex Special Illustration Rare — absolute topper.', features:['Special Illustration','Hoge waarde','Gelimiteerd'], badge:'Sale', stock:7, rating:4.9, reviewCount:52 },
  { id:'p7',  slug:'monkey-d-luffy-op01-leader',      name:'Monkey D. Luffy – OP-01 Leader Foil',     brand:'One Piece TCG', categorySlug:'one-piece',  price:12.95, images:['https://images.unsplash.com/photo-1607704240476-18b5b2af7040?w=800&q=80'], description:'Monkey D. Luffy Leader foil kaart uit de eerste One Piece TCG set.', features:['Leader kaart','OP-01 set','Foil finish'], stock:10, rating:4.8, reviewCount:29 },
  { id:'p8',  slug:'roronoa-zoro-sr-op02',            name:'Roronoa Zoro – OP-02 Super Rare',         brand:'One Piece TCG', categorySlug:'one-piece',  price:24.95, images:['https://images.unsplash.com/photo-1607704240476-18b5b2af7040?w=800&q=80'], description:'Roronoa Zoro Super Rare uit OP-02 Paramount War.', features:['Super Rare','OP-02 set','Hoge vraag'], badge:'Bestseller', stock:6, rating:4.9, reviewCount:41 },
  { id:'p9',  slug:'real-madrid-thuisshirt-2425',     name:'Real Madrid 24/25 Thuisshirt',            brand:'Adidas',      categorySlug:'soccer-cards', price:89.95, images:['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'], description:'Officieel Real Madrid thuisshirt 2024/2025.', features:['Officieel gelicenseerd','Adidas Climacool','Maten XS–XXL'], badge:'Nieuw', stock:18, rating:4.8, reviewCount:63 },
  { id:'p10', slug:'bellingham-topps-gold-2024',      name:'Bellingham – Topps Gold Label 2024',      brand:'Topps',       categorySlug:'single-card',  price:44.95, images:['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'], description:'Jude Bellingham Topps Gold Label gelimiteerde druk.', features:['Gold Label','Gelimiteerde druk','Hoge waarde'], badge:'Limited', stock:2, rating:5.0, reviewCount:34 },
  { id:'p11', slug:'naruto-figur-banpresto',          name:'Naruto Shippuden Figür – Banpresto',      brand:'Banpresto',   categorySlug:'figur',         price:34.95, images:['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], description:'Officiële Banpresto Naruto figuur, 18cm.', features:['Officieel','18cm','Banpresto'], badge:'Nieuw', stock:8, rating:4.8, reviewCount:17 },
  { id:'p12', slug:'ferrari-f40-diecast-bburago',     name:'Ferrari F40 Diecast 1:18 – Bburago',     brand:'Bburago',     categorySlug:'diecast',       price:49.95, comparePrice:59.95, images:['https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80'], description:'Ferrari F40 schaalmodel 1:18 van Bburago.', features:['1:18 schaal','Metaal','Deuren open'], badge:'Sale', stock:5, rating:4.7, reviewCount:22 },
]

// ─── LEGACY HELPERS (mevcut sayfalar için) ────────────────

export const getCategoryBySlug = (slug: string) => CATEGORIES.find(c => c.slug === slug) ?? null
export const getProductBySlug  = (slug: string) => PRODUCTS.find(p => p.slug === slug) ?? null
export const getProductsByCategory = (slug: string) => PRODUCTS.filter(p => p.categorySlug === slug)
export const getFeaturedProducts   = (limit = 4) => PRODUCTS.filter(p => p.badge).slice(0, limit)
export const getRelatedProducts    = (product: Product, limit = 4) => PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, limit)

// ─── SUPABASE ASYNC (ileride sayfalar buna geçecek) ───────

export async function getAllCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) { console.error(error.message); return CATEGORIES }
  return data ?? CATEGORIES
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error(error.message); return PRODUCTS }
  return data ?? PRODUCTS
}

export async function getProductBySlugAsync(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  if (error) { console.error(error.message); return getProductBySlug(slug) }
  return data
}

export async function getProductsByCategoryAsync(categorySlug: string): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories!inner(*)')
    .eq('categories.slug', categorySlug)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error(error.message); return getProductsByCategory(categorySlug) }
  return data ?? []
}

export async function getRelatedProductsAsync(product: Product, limit = 4): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('category_id', product.category_id ?? '')
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(limit)
  if (error) { console.error(error.message); return getRelatedProducts(product, limit) }
  return data ?? []
}
