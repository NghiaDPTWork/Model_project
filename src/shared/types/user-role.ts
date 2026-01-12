// User Roles (const object pattern - TypeScript strict mode compatible)
export const UserRole = {
  CUSTOMER: 'customer',
  STAFF: 'staff',
  OPERATIONS: 'operations',
  MANAGER: 'manager',
  ADMIN: 'admin'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
