import { http, HttpResponse } from 'msw'

import countries from '@/test/mocks/api/data/countries.json'
import ATA from '@/test/mocks/api/data/country-ata.json'
import BLR from '@/test/mocks/api/data/country-blr.json'
import notFound from '@/test/mocks/api/data/not-found.json'

const API_URL = import.meta.env.VITE_API_URL

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json(countries)
  }),
  http.get(`${API_URL}/codes.alpha_3/:countryAlpha3Code`, ({ params }) => {
    const { countryAlpha3Code } = params

    if (countryAlpha3Code === 'ATA') return HttpResponse.json(ATA)

    if (countryAlpha3Code === 'BLR') return HttpResponse.json(BLR)

    return HttpResponse.json(notFound)
  }),
]
