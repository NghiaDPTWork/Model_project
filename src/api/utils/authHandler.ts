// Shared Auth Handlers - Centralized authentication utilities

/**
 * Handle unauthorized (401) response
 *
 */
export const handleUnauthorized = (): void => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login'
  }
}
