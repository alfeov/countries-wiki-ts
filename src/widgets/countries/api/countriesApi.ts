import type { CountryItem } from '@/entities/country/model/types'
import type { FiltersState } from '@/features/filters/model/filtersSlice'
import {
  api,
  type Meta,
  type RawResultType,
  type ResultType,
} from '@/shared/api'

type InitialPageParam = Pick<Meta, 'limit' | 'offset'>

interface Params extends InitialPageParam {
  response_fields: string
  q?: string
  region?: string
}

const countriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.infiniteQuery<
      ResultType<CountryItem[]>,
      FiltersState,
      InitialPageParam,
      RawResultType<CountryItem[]>
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0,
          limit: 25,
        },
        getNextPageParam: (lastPage, _, lastPageParam) => {
          const nextOffset = lastPageParam.offset + lastPageParam.limit
          const remainingItems = lastPage?.meta.total - nextOffset

          if (remainingItems <= 0) {
            return undefined
          }

          return {
            ...lastPageParam,
            offset: nextOffset,
          }
        },
      },
      query: ({
        pageParam: { offset, limit },
        queryArg: { search = '', region = '' } = {},
      }) => {
        const params: Params = {
          response_fields:
            'flag.url_png,names.common,codes.alpha_3,population,region,capitals',
          offset,
          limit,
        }
        if (search) params.q = search
        if (region) params.region = region

        return {
          url: '',
          params,
        }
      },
      transformResponse: (res) => res.data,
      providesTags: ['Countries'],
    }),
  }),
})

export const { useGetCountriesInfiniteQuery } = countriesApi

// queryFn: async () => {
//   await wait(1000)
//   return { data: data.data }
// },
