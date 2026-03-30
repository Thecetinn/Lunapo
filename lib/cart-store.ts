import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export interface CartItem { product: Product; quantity: number; }

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((s) => {
        const ex = s.items.find(i => i.product.id === product.id);
        if (ex) return { items: s.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
        return { items: [...s.items, { product, quantity: 1 }] };
      }),
      removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.product.id !== id) })),
      updateQty: (id, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter(i => i.product.id !== id) : s.items.map(i => i.product.id === id ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "lunapo-cart" }
  )
);
