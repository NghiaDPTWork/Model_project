export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  stock: number
  brand?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isSale?: boolean
  salePrice?: number

  // Timestamps
  createdAt: Date
  updatedAt: Date
}
