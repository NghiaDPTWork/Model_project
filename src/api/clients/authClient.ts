// Auth API Client - Pre-configured for Authentication APIs
import { API_BASE_URL } from '../config'
import { createApiClient } from '../createApiClient'
import { getStoredToken, handleUnauthorized } from '../utils'

/**
 * Auth Client - Cho các API authentication
 *
 */
export const authClient = createApiClient({
  baseURL: `${API_BASE_URL}/auth`,
  getToken: getStoredToken,
  onUnauthorized: handleUnauthorized
})
