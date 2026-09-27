import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { API_URL } from '@/test/mocks/api/handlers'
import { server } from '@/test/mocks/api/server'
import { renderWithProviders } from '@/test/renderWithProviders'

import { BorderCountries } from './BorderCountries'

const borderCodes = ['BLR', 'ATA']

describe('BorderCountries', () => {
  it('should render skeletons during fetching and remove after data loaded', async () => {
    renderWithProviders(
      undefined,
      undefined,
      <BorderCountries borderCodes={borderCodes} />,
    )

    expect(screen.getAllByTestId('skeleton')).toHaveLength(borderCodes.length)

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'))
  })
  it('should not render skeletons and border countries if borderCodes is missing', async () => {
    renderWithProviders(
      undefined,
      undefined,
      <BorderCountries borderCodes={[]} />,
    )

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })
  it('should render error message on API error', async () => {
    server.use(
      http.get(`${API_URL}/codes.alpha_3/BLR`, () => {
        return HttpResponse.json({ error: 'Mock error' }, { status: 500 })
      }),
    )

    renderWithProviders(
      undefined,
      undefined,
      <BorderCountries borderCodes={borderCodes} />,
    )

    const errorMessage = await screen.findByText(/Status code: 500/i)
    expect(errorMessage).toBeInTheDocument()
  })
  it('should render border countries when data is loaded successfully', async () => {
    renderWithProviders(
      undefined,
      undefined,
      <BorderCountries borderCodes={borderCodes} />,
    )

    expect(await screen.findByText(/Belarus/i)).toBeInTheDocument()
    expect(await screen.findByText(/Antarctica/i)).toBeInTheDocument()
  })
  it('should render links to country details page', async () => {
    renderWithProviders(
      undefined,
      undefined,
      <BorderCountries borderCodes={borderCodes} />,
    )

    const belarusLink = await screen.findByRole('link', { name: /Belarus/i })
    const antarcticaLink = await screen.findByRole('link', {
      name: /Antarctica/i,
    })

    expect(belarusLink).toHaveAttribute('href', '/BLR')
    expect(antarcticaLink).toHaveAttribute('href', '/ATA')
  })
})
