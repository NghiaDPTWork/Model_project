// Cart Types
/**
 * Cart Item Interface
 *
 */
export interface CartItem {
  id: string
  productId: string
  variantId: string
  name: string
  price: number
  quantity: number
  image: string
}

/**
 * Cart Summary Interface
 *
 */
export interface CartSummary {
  totalItems: number
  totalPrice: number
  itemCount: number
}
