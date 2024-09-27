import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'

const router = createBrowserRouter([
  // Auth routes

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

      {
        path: 'product',
        lazy: async () => ({
          Component: (await import('./pages/product')).default,
        })
      },

      {
        path: 'stocks',
        lazy: async () => ({
          Component: (await import('./pages/stocks')).default,
        })
      },

      {
        path: 'import-contacts',
        lazy: async () => ({
          Component: (await import('./pages/import-contacts')).default,
        })
      },

      {
        path: 'export-contacts',
        lazy: async () => ({
          Component: (await import('./pages/export-contacts')).default,
        })
      },

      {
        path: 'raw-materials-stock',
        lazy: async () => ({
          Component: (await import('./pages/raw-materials-stock')).default,
        })
      },

      {
        path: 'packaging-materials-stock',
        lazy: async () => ({
          Component: (await import('./pages/packaging-materials-stock')).default,
        })
      },

      {
        path: 'others-stock',
        lazy: async () => ({
          Component: (await import('./pages/others-stock')).default,
        })
      },

      {
        path: 'ready-products-stock',
        lazy: async () => ({
          Component: (await import('./pages/ready-products-stock')).default,
        })
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