import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import notFound from '@/test/mocks/api/data/not-found.json'
import { API_URL } from '@/test/mocks/api/handlers'
import { server } from '@/test/mocks/api/server'
import { renderWithProviders } from '@/test/renderWithProviders'

import { limit } from '../../api/countriesApi'

describe('CountriesList', () => {
  it('should render loading indicator on initial loading', () => {
    renderWithProviders(['/'])

    const loadingIndicator = screen.getByText(/loading countries/i)
    expect(loadingIndicator).toBeInTheDocument()
  })
  it('should render fetching indicator on fetch after initial loading', async () => {
    renderWithProviders(['/'])

    await waitForElementToBeRemoved(() =>
      screen.getByText(/loading countries/i),
    )
    const loadMoreBtn = screen.getByRole('button', { name: /load more/i })
    await userEvent.click(loadMoreBtn)

    expect(await screen.findByTestId('fetching-indicator')).toBeInTheDocument()
  })
  it('should render error message on API error', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json({ error: 'Mock error' }, { status: 500 })
      }),
    )

    renderWithProviders(['/'])

    const errorMessage = await screen.findByText(/Status code: 500/i)
    expect(errorMessage).toBeInTheDocument()
  })
  it('should render not found message when returned empty array', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json(notFound)
      }),
    )

    renderWithProviders(['/'])

    const notFoundMessage = await screen.findByText(/there are no/i)
    expect(notFoundMessage).toBeInTheDocument()
  })
  it('should render countries card when data is loaded successfully', async () => {
    renderWithProviders(['/'])

    await waitForElementToBeRemoved(() =>
      screen.getByText(/loading countries/i),
    )
    const listitems = screen.getAllByTestId('listitem')

    expect(listitems).toHaveLength(limit)
  })
  it('should render load more btn when data is loaded and next page is exist', async () => {
    renderWithProviders(['/'])

    await waitForElementToBeRemoved(() =>
      screen.getByText(/loading countries/i),
    )
    const loadMoreBtn = screen.getByRole('button', { name: /load more/i })
    expect(loadMoreBtn).toBeInTheDocument()

    // load next page (second page is last and expected that btn will disappear)
    await userEvent.click(loadMoreBtn)
    const fetchingIndicator = await screen.findByTestId('fetching-indicator')
    await waitForElementToBeRemoved(fetchingIndicator)

    expect(screen.queryByRole('button', { name: /load more/i })).toBeNull()
  })
})
