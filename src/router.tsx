import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'

const router = createBrowserRouter([
  // Auth routes
  // {
  //   path: '/login',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/login')).default,
  //   }),
  // },
  // {
  //   path: `/registration`,
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/registration')).default,
  //   }),
  // },
  // {
  //   path: '/forgot-password',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/forgot-password')).default,
  //   }),
  // },
  // {
  //   path: '/reset-password',
  //   lazy: async () => ({
  //     Component: (await import('./pages/auth/reset-password')).default,
  //   }),
  // },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/home')).default,
        }),
      },

    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router