import { http, HttpResponse } from 'msw'

import { wait } from '@/shared/lib/utils/wait'
import countries from '@/test/mocks/api/data/countries.json'
import countriesP2 from '@/test/mocks/api/data/countries-p2.json'
import ATA from '@/test/mocks/api/data/country-ata.json'
import BLR from '@/test/mocks/api/data/country-blr.json'
import notFound from '@/test/mocks/api/data/not-found.json'

export const API_URL = import.meta.env.VITE_API_URL

export const handlers = [
  http.get(API_URL, async ({ request }) => {
    const searchParams = new URLSearchParams(request.url)
    const offset = searchParams.get('offset')
    if (Number(offset) === 25) {
      await wait(100)
      return HttpResponse.json(countriesP2)
    }
    return HttpResponse.json(countries)
  }),
  http.get(`${API_URL}/codes.alpha_3/:countryAlpha3Code`, ({ params }) => {
    const { countryAlpha3Code } = params

    if (countryAlpha3Code === 'ATA') return HttpResponse.json(ATA)

    if (countryAlpha3Code === 'BLR') return HttpResponse.json(BLR)

    return HttpResponse.json(notFound)
  }),
]
