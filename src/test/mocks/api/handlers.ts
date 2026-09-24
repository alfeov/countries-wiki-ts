import { http, HttpResponse } from 'msw'

import countries from '@/test/mocks/api/data/countries.json'
import country from '@/test/mocks/api/data/country.json'
import notFound from '@/test/mocks/api/data/not-found.json'

const API_URL = import.meta.env.VITE_API_URL

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json(countries)
  }),
  http.get(`${API_URL}/codes.alpha_3/:code`, ({ params }) => {
    const { code } = params

    if (code !== 'BLR') return HttpResponse.json(notFound)

    return HttpResponse.json(country)
  }),
]
