// ProductCard Component - Common App Component
// Dùng Card, Button từ shared/ui, có logic nghiệp vụ app
import { Button, Card } from '@/shared/components/ui'
import type { Product } from '@/shared/types'

interface Props {
  product: Product
  onAddToCart?: (id: string) => void
}

export function ProductCard({ product, onAddToCart }: Props) {
  return (
    <Card>
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}đ</p>
      {product.stock === 0 && <span className="badge-danger">Hết hàng</span>}
      <Button onClick={() => onAddToCart?.(product.id)}>Thêm vào giỏ</Button>
    </Card>
  )
}

