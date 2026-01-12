import type { UserRole } from './user-role'

export interface User {
  id: string
  email: string
  fullName: string
  phone?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
