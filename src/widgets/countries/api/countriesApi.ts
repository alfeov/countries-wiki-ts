import type { CountryItem } from '@/entities/country/model/types'
import type { FilterRegion, FiltersState } from '@/features/filters/model'
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
  region?: FilterRegion
}

const initialOffset = 0
export const limit = 25

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
          offset: initialOffset,
          limit,
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
        queryArg: { search, region } = {},
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
