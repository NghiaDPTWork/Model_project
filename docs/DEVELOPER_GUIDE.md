# 📚 HƯỚNG DẪN LUỒNG CODE - Developer Guide

> Tài liệu hướng dẫn chi tiết cách tạo và vận hành code trong dự án.

---

## 🔄 LUỒNG XỬ LÝ TỔNG QUAN

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         LUỒNG XỬ LÝ CODE                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  USER ACTION                                                            │
│      │                                                                  │
│      ▼                                                                  │
│  ROUTER (routes/index.tsx) ◄──── Điều hướng (URL -> Page)               │
│      │                                                                  │
│      ▼                                                                  │
│  PAGE (pages/...) ◄──── Page Wrapper (Layout + Feature Containers)      │
│      │                                                                  │
│      ▼                                                                  │
│  FEATURE COMPONENT ◄──── UI Logic                                       │
│      │                                                                  │
│      ▼                                                                  │
│  HOOK (features/xxx/hooks) ◄──── State + React Query                    │
│      │                                                                  │
│      ▼                                                                  │
│  SERVICE (features/xxx/services) ◄──── Business Logic                   │
│      │                                                                  │
│      ▼                                                                  │
│  CLIENT (api/clients) ◄──── Axios Instance + Auth Handler               │
│      │                                                                  │
│      ▼                                                                  │
│  BACKEND API                                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 CẤU TRÚC THƯ MỤC (MỚI)

```
src/
├── api/                      # [1] API Layer - Cấu hình & Clients
│   ├── clients/              # Axios instances (authClient, productClient, mainClient)
│   │   └── index.ts          # Export tất cả clients
│   ├── utils/                # ⭐ Shared auth handlers
│   │   ├── authHandler.ts    # handleUnauthorized, getStoredToken
│   │   └── index.ts
│   ├── errors/               # Error handling (parseApiError, error types)
│   ├── hooks/                # API-level hooks (useApiError)
│   ├── types/                # API types (ApiClientConfig)
│   ├── createApiClient.ts    # Factory tạo Axios instance
│   ├── endpoints.ts          # Tất cả API endpoints
│   └── index.ts
│
├── store/                    # [2] Global State (Zustand)
│   ├── auth.store.ts         # Auth state (dùng User từ shared/types)
│   ├── cart.store.ts         # Cart state (dùng CartItem từ shared/types)
│   └── index.ts
│
├── shared/                   # [3] Code dùng chung
│   ├── types/                # ⭐ Tất cả types tập trung
│   │   ├── user.types.ts     # User interface
│   │   ├── cart.types.ts     # CartItem interface
│   │   ├── product.types.ts  # Product interface
│   │   ├── common.types.ts   # ApiResponse, PaginatedResponse
│   │   └── index.ts
│   ├── constants/            # Messages, configs
│   ├── hooks/                # Custom hooks dùng chung
│   └── utils/                # Helper functions
│
├── features/                 # [4] Feature modules
│   └── [feature-name]/
│       ├── components/       # UI của feature
│       ├── hooks/            # ⭐ useXxx hooks (React Query)
│       ├── services/         # ⭐ Business logic (gọi API clients)
│       ├── types/            # Types riêng của feature
│       └── index.ts
│
├── pages/                    # [5] Page wrappers
│   ├── auth/                 # LoginPage, RegisterPage
│   └── customer/             # HomePage, ProductPage
│
└── routes/                   # [6] Router config
    ├── index.tsx             # createBrowserRouter
    └── paths.ts              # Route constants
```

---

## ⭐ KIẾN TRÚC MỚI - CÁC THAY ĐỔI QUAN TRỌNG

### 1. Shared Auth Handler (`api/utils/authHandler.ts`)

> **Lý do:** Tránh duplicate code xử lý 401/403 ở nhiều clients.

```typescript
// ✅ CÁCH MỚI - Centralized handler
import { getStoredToken, handleUnauthorized } from '../utils'

export const authClient = createApiClient({
  baseURL: `${API_BASE_URL}/auth`,
  getToken: getStoredToken,           // ← Một function dùng chung
  onUnauthorized: handleUnauthorized  // ← Một handler dùng chung
})
```

**Functions có sẵn:**
| Function | Mô tả |
|----------|-------|
| `getStoredToken()` | Lấy accessToken từ localStorage |
| `handleUnauthorized()` | Xóa tokens + redirect /login |
| `handleForbidden()` | Log warning permission denied |

---

### 2. Types Tập Trung (`shared/types/`)

> **Lý do:** Tránh define lại types ở nhiều nơi.

**Types có sẵn:**

| Type | File | Sử dụng |
|------|------|---------|
| `User` | `user.types.ts` | Auth store, profile |
| `CartItem` | `cart.types.ts` | Cart store, checkout |
| `Product` | `product.types.ts` | Product listing |
| `ApiResponse<T>` | `common.types.ts` | API response wrapper |
| `UserRole` | `user-role.ts` | Role-based access |

**Import:**
```typescript
import type { User, CartItem, ApiResponse } from '@/shared/types'
```

---

### 3. Feature-based Services

> **Lý do:** Mỗi feature tự quản lý service, không tập trung ở api/services.

```
features/auth/services/auth.service.ts   → Gọi authClient
features/customer/cart/hooks/useCart.ts  → Gọi mainClient
```

**Flow mới:**
```
Component → Feature Hook → Feature Service → API Client → Backend
```

---

## 🚀 HƯỚNG DẪN TẠO FEATURE MỚI

### Bước 1️⃣: Định nghĩa Types

📁 `features/product/types/product.types.ts`
```typescript
// Nếu type dùng ở 2+ features → đặt ở shared/types/
export interface ProductDetail {
  id: string
  name: string
  variants: ProductVariant[]
}
```

### Bước 2️⃣: Khai báo Endpoint

📁 `api/endpoints.ts`
```typescript
PRODUCT: {
  LIST: '/products',
  DETAIL: (id: string) => `/products/${id}`
}
```

### Bước 3️⃣: Tạo Service

📁 `features/product/services/product.service.ts`
```typescript
import { publicProductClient } from '@/api/clients'
import { ENDPOINTS } from '@/api/endpoints'

export const productService = {
  getAll: () => publicProductClient.get(ENDPOINTS.PRODUCTS.LIST),
  getById: (id: string) => publicProductClient.get(ENDPOINTS.PRODUCTS.DETAIL(id))
}
```

### Bước 4️⃣: Tạo Hook (React Query)

📁 `features/product/hooks/useProducts.ts`
```typescript
import { useQuery } from '@tanstack/react-query'
import { productService } from '../services'

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll()
  })
  return { products: data?.data, isLoading, error }
}
```

### Bước 5️⃣: Tạo Component + Page + Route

(Giữ nguyên như cũ)

---

## 📋 API CLIENTS CÓ SẴN

| Client | BaseURL | Auth | Sử dụng |
|--------|---------|------|---------|
| `publicAuthClient` | `/auth` | ❌ | Login, Register |
| `authClient` | `/auth` | ✅ | Profile, Logout |
| `publicProductClient` | `/products` | ❌ | Product listing |
| `productClient` | `/products` | ✅ | Admin product CRUD |
| `publicClient` | `/api` | ❌ | Other public APIs |
| `mainClient` | `/api` | ✅ | Other protected APIs |

---

## ✅ CHECKLIST KHI TẠO FEATURE MỚI

```
□ 1. Define Types (feature/types/ hoặc shared/types/ nếu dùng chung)
□ 2. Add Endpoints (api/endpoints.ts)
□ 3. Create Service (features/[feature]/services/)
□ 4. Create Hook (features/[feature]/hooks/) - dùng React Query
□ 5. Create Components (features/[feature]/components/)
□ 6. Create Page (pages/[domain]/[page].tsx)
□ 7. Register Route (routes/index.tsx)
```

---

## 🚫 NHỮNG ĐIỀU KHÔNG NÊN LÀM

| ❌ Sai | ✅ Đúng |
|--------|---------|
| Copy logic `onUnauthorized` vào client mới | Import từ `api/utils/authHandler` |
| Define `CartItem` inline trong component | Import từ `@/shared/types` |
| Tạo service trong `api/services/` | Tạo trong `features/[name]/services/` |
| Hardcode message | Dùng `ERROR_MESSAGES.XXX` |
| Call API trực tiếp trong component | Qua Hook → Service → Client |

---

