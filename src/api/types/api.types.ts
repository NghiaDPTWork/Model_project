// API Core Types
import type { AxiosInstance } from 'axios'

// Re-export from shared types for convenience
export type { ApiResponse } from '@/shared/types'

// API Client Configuration
export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
  getToken?: () => string | null
  onUnauthorized?: () => void
  onForbidden?: () => void
}

export type ApiClient = AxiosInstance
