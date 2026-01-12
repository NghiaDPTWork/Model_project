import { LoginPage } from '@/pages/auth/LoginPage'
import { HomePage } from '@/pages/customer/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
