import { http, HttpResponse } from 'msw'

import type { FiltersState } from '@/features/filters/model'
import { API_URL } from '@/test/mocks/api/handlers'
import { server } from '@/test/mocks/api/server'
import { renderWithRedux, type StoreType } from '@/test/renderWithRedux'

import { countriesApi, limit } from './countriesApi'

const filters: FiltersState = { region: '', search: '' }

describe('countriesApi', () => {
  let spyOnFetch: ReturnType<typeof vi.spyOn>
  let mockStore: StoreType

  beforeEach(() => {
    spyOnFetch = vi.spyOn(globalThis, 'fetch')
    mockStore = renderWithRedux().mockStore
  })

  it('should not include filters in request url if none', async () => {
    await mockStore.dispatch(
      countriesApi.endpoints.getCountries.initiate(filters),
    )

    const [request] = spyOnFetch.mock.calls[0] as [Request]
    const url = new URL(request.url)

    expect(url.searchParams.get('region')).toBeNull()
    expect(url.searchParams.get('q')).toBeNull()
  })
  it('should include filters in request url if present', async () => {
    await mockStore.dispatch(
      countriesApi.endpoints.getCountries.initiate({
        region: 'Europe',
        search: 'Belarus',
      }),
    )

    const [request] = spyOnFetch.mock.calls[0] as [Request]
    const url = new URL(request.url)

    expect(url.searchParams.get('region')).toBe('Europe')
    expect(url.searchParams.get('q')).toBe('Belarus')
  })

  it('should return has next page when total items more then limit', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json({ data: { meta: { total: limit + 1 } } })
      }),
    )
    const { hasNextPage } = await mockStore.dispatch(
      countriesApi.endpoints.getCountries.initiate(filters),
    )

    expect(hasNextPage).toBe(true)
  })
  it('should return has not next page when total items less then limit', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json({ data: { meta: { total: limit - 1 } } })
      }),
    )
    const { hasNextPage } = await mockStore.dispatch(
      countriesApi.endpoints.getCountries.initiate(filters),
    )

    expect(hasNextPage).toBe(false)
  })
  it('should return has not next page when total items is equal to limit', async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json({ data: { meta: { total: limit } } })
      }),
    )
    const { hasNextPage } = await mockStore.dispatch(
      countriesApi.endpoints.getCountries.initiate(filters),
    )

    expect(hasNextPage).toBe(false)
  })
})
