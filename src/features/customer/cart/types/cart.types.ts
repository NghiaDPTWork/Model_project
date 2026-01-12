import { Product } from '@/shared/types'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  totalPrice: number
}

export interface Cart {
  id: string
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
  userId?: string
}

export interface AddToCartInput {
  productId: string
  quantity: number
}

export interface UpdateCartItemInput {
  quantity: number
}
