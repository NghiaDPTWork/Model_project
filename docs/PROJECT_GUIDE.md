# 🕶️ Eyewear E-commerce Project

React + TypeScript e-commerce platform for eyewear with SOLID architecture.

## 🚀 Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run validate   # Check code before commit
```

---

## 📁 Folder Structure & Flow

```
src/
├── api/              # API layer (Axios client)
├── store/            # Global state (Zustand)
├── shared/           # Shared resources
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Helper functions
│   ├── types/        # Shared TypeScript types
│   └── constants/    # Error messages, configs
│
└── features/         # Feature modules (by EPIC)
    ├── auth/         # Authentication
    ├── customer/     # EPIC 1: Cart, Checkout, Wishlist
    ├── staff/        # EPIC 2: Order Management
    ├── operations/   # EPIC 3: Lab, QC, Packing
    ├── manager/      # EPIC 4: Policy, Pricing
    └── admin/        # EPIC 5: RBAC, Config
```

---

## 🔄 Development Flow

### 1️⃣ Khi tạo Feature mới

```
features/
└── [feature-name]/
    ├── components/     # UI components (chỉ render)
    ├── hooks/          # Custom hooks (useXxx)
    ├── services/       # Business logic
    ├── repositories/   # API calls
    ├── types/          # TypeScript interfaces
    └── index.ts        # Export barrel
```
---

## 🛠️ NPM Scripts

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Start dev server |
| `npm run build` | Build production |
| `npm run lint` | Check ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format với Prettier |
| `npm run validate` | Type-check + Lint + Format |
| `npm run validate:fix` | Auto-fix tất cả |

---

## 📝 Commit Convention

```bash
git commit -m "feat: add user login"
git commit -m "fix: resolve cart bug"
```

| Type | Mô tả |
|------|-------|
| `feat` | Tính năng mới |
| `fix` | Sửa bug |
| `docs` | Documentation |
| `style` | Format code |
| `refactor` | Refactor |
| `test` | Tests |
| `chore` | Maintenance |

---

## 📂 Path Aliases

```typescript
import { useAuth } from '@/features/auth'
import { UserRole } from '@/shared/types'
import { ERROR_MESSAGES } from '@/shared/constants'
import { useAuthStore } from '@/store'
import { apiClient } from '@/api'
```

---

## 🔧 Tech Stack

- React 19 + TypeScript
- Vite
- Zustand (state management)
- React Router v7
- Tailwind CSS v4
- Axios
- ESLint + Prettier + Husky
