import { http, HttpResponse } from 'msw'

import ATA from '@/test/mocks/api/data/country-ata.json'
import BLR from '@/test/mocks/api/data/country-blr.json'
import { API_URL } from '@/test/mocks/api/handlers'
import { server } from '@/test/mocks/api/server'
import { renderWithRedux, type StoreType } from '@/test/renderWithRedux'

import { bordersApi } from './bordersApi'

describe('useGetBordersNamesQuery', () => {
  let spyOnFetch: ReturnType<typeof vi.spyOn>
  let mockStore: StoreType

  beforeEach(() => {
    spyOnFetch = vi.spyOn(globalThis, 'fetch')
    mockStore = renderWithRedux().mockStore
  })

  it('should return empty array if provided empty borderCodes', async () => {
    const result = await mockStore.dispatch(
      bordersApi.endpoints.getBordersNames.initiate([]),
    )

    expect(result.data).toEqual([])
    expect(result.error).toBeUndefined()
    expect(spyOnFetch).not.toHaveBeenCalled()
  })
  it('should return array of borders info on success', async () => {
    const result = await mockStore.dispatch(
      bordersApi.endpoints.getBordersNames.initiate(['BLR', 'ATA']),
    )

    expect(result.data).toEqual([BLR.data, ATA.data])
    expect(result.error).toBeUndefined()
    expect(spyOnFetch).toHaveBeenCalledTimes(2)
  })
  it('should return error when a single request fails', async () => {
    server.use(
      http.get(`${API_URL}/codes.alpha_3/BLR`, () => {
        return HttpResponse.json({ error: 'Mock error' }, { status: 500 })
      }),
    )
    const result = await mockStore.dispatch(
      bordersApi.endpoints.getBordersNames.initiate(['BLR', 'ATA']),
    )

    expect(result.data).toBeUndefined()
    expect(result.error).toEqual({ data: { error: 'Mock error' }, status: 500 })
    expect(spyOnFetch).toHaveBeenCalledTimes(2)
  })
  it('should put undefined in result array when a response has unexpected shape', async () => {
    // return unexpected shape in request
    server.use(
      http.get(`${API_URL}/codes.alpha_3/BLR`, () => {
        return HttpResponse.json('string')
      }),
    )

    const result = await mockStore.dispatch(
      bordersApi.endpoints.getBordersNames.initiate(['BLR', 'ATA']),
    )

    expect(spyOnFetch).toHaveBeenCalledTimes(2)
    expect(result.data).toEqual([undefined, ATA.data])
    expect(result.error).toBeUndefined()
  })
})
