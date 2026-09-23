import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

describe('Layout', () => {
  it.each(['/', '/some-page', '/some-page/slug'])(
    'renders on some page relative to /',
    (route) => {
      renderWithProviders([route])

      const link = screen.getByRole('link', { name: /counties wiki/i })
      expect(link).toBeInTheDocument()
    },
  )
  it('should navigate to CountriesPage when click on logo', async () => {
    renderWithProviders(['/some-page'])

    const link = screen.getByRole('link', { name: /counties wiki/i })
    await userEvent.click(link)

    expect(screen.getByTestId('countries-page')).toBeInTheDocument()
  })
})
