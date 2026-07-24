import { createBrowserRouter } from 'react-router'

import { ErrorBoundary } from '@/app/providers/router/ErrorBoundary'
import { ErrorBoundaryOutlet } from '@/app/providers/router/ErrorBoundaryOutlet/ErrorBoundaryOutlet'
import { CountriesPage } from '@/pages/CountriesPage'
import { CountryPage } from '@/pages/CountryPage'
import { Layout } from '@/pages/Layout/Layout'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        Component: ErrorBoundaryOutlet,
        ErrorBoundary: ErrorBoundary,
        children: [
          {
            index: true,
            Component: CountriesPage,
          },
          {
            path: ':countryAlpha3Code',
            Component: CountryPage,
          },
          {
            path: '*',
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
])
