import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'

export function renderWithRouter(
  router: ReturnType<typeof createMemoryRouter>,
  component: React.ReactNode = null,
) {
  return render(
    <>
      <RouterProvider router={router} />
      {component}
    </>,
  )
}
