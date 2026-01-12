// Main API Client - General purpose authenticated client
import { API_BASE_URL } from '../config'
import { createApiClient } from '../createApiClient'
import { getStoredToken, handleUnauthorized } from '../utils'

/**
 * Main Client - Cho các API chung cần authentication
 */
export const mainClient = createApiClient({
  baseURL: API_BASE_URL,
  getToken: getStoredToken,
  onUnauthorized: handleUnauthorized
})
