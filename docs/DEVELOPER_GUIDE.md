# 📚 HƯỚNG DẪN LUỒNG CODE - Developer Guide

> Tài liệu hướng dẫn chi tiết cách code trong dự án Eyewear.
> **Cập nhật:** 12/01/2026

---

## 🔄 LUỒNG XỬ LÝ

```
USER ACTION
    │
    ▼
ROUTER (routes/index.tsx)     ← URL → Page
    │
    ▼
PAGE (pages/...)              ← Layout + Feature
    │
    ▼
FEATURE COMPONENT             ← UI Logic
    │
    ▼
HOOK (features/xxx/hooks)     ← React Query + State
    │
    ▼
SERVICE (features/xxx/services) ← Business Logic
    │
    ▼
CLIENT (api/clients)          ← Axios + Auth
    │
    ▼
BACKEND API
```

---

## 📁 CẤU TRÚC THƯ MỤC

```
src/
├── api/                      # API Layer
│   ├── clients/              # Axios instances
│   │   ├── authClient.ts     # Auth APIs
│   │   └── mainClient.ts     # General APIs
│   ├── utils/                # Auth handlers
│   ├── types/                # API types
│   ├── config.ts             # API_BASE_URL
│   ├── createApiClient.ts    # Factory
│   └── endpoints.ts          # All endpoints
│
├── store/                    # Zustand stores
│   ├── auth.store.ts
│   └── cart.store.ts
│
├── shared/                   # Code dùng chung
│   ├── types/                # User, CartItem, ApiResponse
│   ├── constants/            # Messages
│   └── hooks/                # Custom hooks
│
├── features/                 # Feature modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/            # React Query hooks
│       ├── services/         # API calls
│       └── types/
│
├── pages/                    # Page wrappers
└── routes/                   # Router config
```

---

## 📋 API CLIENTS

| Client | Mô tả |
|--------|-------|
| `authClient` | Auth APIs (login, register, profile) |
| `mainClient` | General protected APIs |

**Config:** `api/config.ts`
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

**Auth Handler:** `api/utils/authHandler.ts`
- `handleUnauthorized()` - Xóa tokens + redirect /login

---

## 🚀 TẠO FEATURE MỚI

### 1. Types
```typescript
// features/product/types/product.types.ts
export interface Product {
  id: string
  name: string
  price: number
}
```

### 2. Endpoint
```typescript
// api/endpoints.ts
PRODUCT: {
  LIST: '/products',
  DETAIL: (id: string) => `/products/${id}`
}
```

### 3. Service
```typescript
// features/product/services/product.service.ts
import { mainClient } from '@/api/clients'
import { ENDPOINTS } from '@/api/endpoints'

export const productService = {
  getAll: () => mainClient.get(ENDPOINTS.PRODUCT.LIST)
}
```

### 4. Hook
```typescript
// features/product/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query'
import { productService } from '../services'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll()
  })
}
```

### 5. Component + Page + Route

---

## ✅ CHECKLIST

```
□ 1. Define Types
□ 2. Add Endpoint
□ 3. Create Service
□ 4. Create Hook (React Query)
□ 5. Create Component
□ 6. Create Page
□ 7. Register Route
```

---

## 🚫 KHÔNG LÀM

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Hardcode API URL | Import từ `api/config.ts` |
| Define types inline | Import từ `shared/types/` |
| Hardcode message | Dùng `ERROR_MESSAGES.XXX` |
| Call API trong component | Qua Hook → Service → Client |
