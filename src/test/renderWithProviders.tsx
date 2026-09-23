import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import {
  createMemoryRouter,
  type InitialEntry,
  type RouteObject,
  RouterProvider,
} from 'react-router'

import { routes } from '@/app/providers/router'
import { type PreloadedState, setupStore } from '@/app/providers/store'

export type StoreType = ReturnType<typeof setupStore>

export function renderWithProviders(
  initialEntries?: InitialEntry[],
  preloadedState?: PreloadedState,
  component: React.ReactNode = null,
) {
  const mockStore = setupStore(preloadedState)
  const testRoutes: RouteObject[] = [
    { path: '/test', element: component },
    ...routes,
  ]
  const router = createMemoryRouter(testRoutes, {
    initialEntries: initialEntries ?? ['/test'],
  })
  const renderResult = render(
    <Provider store={mockStore}>
      <RouterProvider router={router} />
    </Provider>,
  )

  return {
    mockStore,
    router,
    ...renderResult,
  }
}
