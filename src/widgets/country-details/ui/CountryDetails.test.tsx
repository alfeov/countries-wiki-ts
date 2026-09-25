import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { useScrollToTop } from '@/shared/lib/hooks/useScrollToTop'
import { server } from '@/test/mocks/api/server'
import { renderWithProviders } from '@/test/renderWithProviders'

const API_URL = import.meta.env.VITE_API_URL

vi.mock('@/shared/lib/hooks/useScrollToTop', { spy: true })

describe('CountryDetails', () => {
  it('should call useScrollToTop', () => {
    renderWithProviders(['/BLR'])

    expect(useScrollToTop).toHaveBeenCalled()
  })
  it('should render loading indicator with country code param on initial loading', () => {
    renderWithProviders(['/BLR'])

    const loadingIndicator = screen.getByText('Loading country with code BLR')
    expect(loadingIndicator).toBeInTheDocument()
  })
  it('should render fetching indicator on fetch after initial loading', async () => {
    const { router } = renderWithProviders(['/BLR'])

    const loadingIndicator = screen.getByText('Loading country with code BLR')
    expect(loadingIndicator).toBeInTheDocument()
    expect(screen.queryByTestId('fetching-indicator')).not.toBeInTheDocument()

    // wait for entire page is loaded
    await screen.findByRole('heading', { name: 'Belarus' })
    // navigate to other route > another request
    await router.navigate('/ATA')

    expect(await screen.findByTestId('fetching-indicator')).toBeInTheDocument()
  })
  it('should render error message on API error', async () => {
    server.use(
      http.get(`${API_URL}/codes.alpha_3/BLR`, () => {
        return HttpResponse.json({ error: 'Mock error' }, { status: 500 })
      }),
    )

    renderWithProviders(['/BLR'])

    const errorMessage = await screen.findByText(/Status code: 500/i)
    expect(errorMessage).toBeInTheDocument()
  })
  it('should render not found message when country is null', async () => {
    renderWithProviders(['/CODE'])

    const notFoundMessage = await screen.findByText(
      'Country with code CODE not found (404)',
    )
    expect(notFoundMessage).toBeInTheDocument()
  })
  it('should render country info when data is loaded successfully', async () => {
    renderWithProviders(['/BLR'])

    const countryName = await screen.findByRole('heading', {
      name: 'Belarus',
    })
    const officialName = await screen.findByText(/Republic of Belarus/i)
    const capital = await screen.findByText(/Minsk/i)

    expect(countryName).toBeInTheDocument()
    expect(capital).toBeInTheDocument()
    expect(officialName).toBeInTheDocument()
  })
  it('should render borders if they present', async () => {
    renderWithProviders(['/BLR'])

    const borderCountriesHeading = await screen.findByRole('heading', {
      name: /Border Countries/i,
    })

    expect(borderCountriesHeading).toBeInTheDocument()
  })
  it('should not render border countries if the country does not have them', async () => {
    renderWithProviders(['/ATA'])

    await screen.findByRole('heading', { level: 1, name: /antarctica/i })
    const borderCountriesHeading = screen.queryByRole('heading', {
      name: /border countries/i,
    })

    expect(borderCountriesHeading).not.toBeInTheDocument()
  })
})
