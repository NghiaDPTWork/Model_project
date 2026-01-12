// useCart Hook - Dependency Injection
import { useCartStore } from '@/store'

export function useCart() {
    return useCartStore()
}
