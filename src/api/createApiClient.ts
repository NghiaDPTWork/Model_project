import axios, { type AxiosInstance } from 'axios'
import type { ApiClientConfig } from './types'

export function createApiClient({
  baseURL,
  timeout = 10000,
  headers = {},
  getToken,
  onUnauthorized,
  onForbidden
}: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout,
    headers: { 'Content-Type': 'application/json', ...headers }
  })

  client.interceptors.request.use((config) => {
    const token = getToken?.()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status
      if (status === 401) onUnauthorized?.()
      if (status === 403) onForbidden?.()
      return Promise.reject(error)
    }
  )

  return client
}
