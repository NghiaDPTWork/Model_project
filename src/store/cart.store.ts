import type { CartItem } from '@/shared/types'
import { create } from 'zustand'

// Cart State Interface
interface CartState {
  items: CartItem[]
  isLoading: boolean

  // Actions
  addItem: (item: CartItem) => void
  updateQuantity: (itemId: string, quantity: number) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  setLoading: (loading: boolean) => void

  // Computed
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item]
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.variantId === itemId ? { ...item, quantity } : item))
    })),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.variantId !== itemId)
    })),

  clearCart: () => set({ items: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}))
