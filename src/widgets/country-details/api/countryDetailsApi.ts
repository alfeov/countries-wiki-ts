import type { Country, CountryCode } from '@/entities/country/model/types'
import { api, type RawResultType, type ResultType } from '@/shared/api'

const countryDetailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCountry: build.query<
      ResultType<Country[] | never[]>,
      CountryCode,
      RawResultType<Country[] | never[]>
    >({
      query: (countryAlpha3Code) => `/codes.alpha_3/${countryAlpha3Code}`,
      transformResponse: (res) => res.data,
      providesTags: ['Country'],
    }),
  }),
})

export const { useGetCountryQuery } = countryDetailsApi

// import data from '@/shared/mock/data.json'
// import { wait } from '../helpers/wait'
// queryFn: async () => {
//   await wait(3000)
//   return { data: data.data }
// },
