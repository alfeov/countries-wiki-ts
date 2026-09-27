import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query'

import type { Border, BorderCode } from '@/entities/borders/model'
import { api, type RawResultType, type ResultType } from '@/shared/api'

interface TempResult {
  data?: ResultType<Border[]>[]
  error: FetchBaseQueryError
}

export const bordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBordersNames: build.query<ResultType<Border[]>[], BorderCode[]>({
      queryFn: async (
        borderCodes,
        _,
        __,
        fetchWithBQ: (
          arg: string | FetchArgs,
        ) => Promise<
          QueryReturnValue<
            RawResultType<Border[]>,
            FetchBaseQueryError,
            FetchBaseQueryMeta
          >
        >,
      ) => {
        if (borderCodes.length === 0) return { data: [] }

        const promises = borderCodes.map((code) =>
          fetchWithBQ({
            url: `/codes.alpha_3/${code}`,
            params: {
              response_fields: 'names.common,codes.alpha_3',
            },
          }),
        )

        const result: TempResult = {
          error: {
            status: 'CUSTOM_ERROR',
            error: 'Failed to get borders data',
          },
        }

        const queryReturnValues = await Promise.all(promises)

        for (const queryReturnValue of queryReturnValues) {
          const queryError = queryReturnValue.error
          if (queryError) {
            return { error: queryError }
          }

          result.data = [...(result?.data ?? []), queryReturnValue.data?.data]
        }

        return result.data ? { data: result.data } : { error: result.error }
      },
      providesTags: ['Borders'],
    }),
  }),
})

export const { useGetBordersNamesQuery } = bordersApi
