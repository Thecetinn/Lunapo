import { createClient } from '@/lib/supabase'

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_price?: number | null
  image_url: string | null
  category_id: string | null
  category?: Category
  stock: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) { console.error(error.message); return [] }
  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single()
  if (error) { console.error(error.message); return null }
  return data
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error(error.message); return [] }
  return data ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  if (error) { console.error(error.message); return null }
  return data
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories!inner(*)')
    .eq('categories.slug', categorySlug)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error(error.message); return [] }
  return data ?? []
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) { console.error(error.message); return [] }
  return data ?? []
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('category_id', product.category_id)
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(limit)
  if (error) { console.error(error.message); return [] }
  return data ?? []
}
