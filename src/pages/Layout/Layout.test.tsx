import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'

import { routes } from '@/app/providers/router'
import { renderWithRouter } from '@/test/renderWithRouter'

describe('Layout', () => {
  it('Should navigate to root page on logo click', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/not-found-page'],
    })

    renderWithRouter(router)

    const link = screen.getByRole('link')
    await userEvent.click(link)

    expect(router.state.location.pathname).toBe('/')
  })
})
