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

const bordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBordersNames: build.query<ResultType<Border[]>[], BorderCode[]>({
      queryFn: async (
        bordersCodes,
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
        const promises = bordersCodes.map((code) =>
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
            error:
              'No data (Possible 404) / Failed to destructuring data (bordersApi)',
          },
        }

        const queryReturnValues = await Promise.all(promises)

        for (const queryReturnValue of queryReturnValues) {
          const queryError = queryReturnValue.error
          if (queryError) {
            return { error: queryError }
          }

          const rawResultData = queryReturnValue.data
          if (rawResultData) {
            const resultData = rawResultData.data
            result.data = [...(result?.data ?? []), resultData]
          } else {
            return {
              error: {
                status: 'CUSTOM_ERROR',
                error: 'Failed destructuring data in bordersApi (bordersApi)',
              },
            }
          }
        }

        if (result.data?.length !== bordersCodes.length) {
          console.error('Input data length not according to output data length')
        }

        return result.data ? { data: result.data } : { error: result.error }
      },
      providesTags: ['Borders'],
    }),
  }),
})

export const { useGetBordersNamesQuery } = bordersApi

// queryFn: async () => {
//   await wait(3000)
//   const result1 = { objects: [data.data.objects[2]] }
//   const result2 = { objects: [data.data.objects[3]] }
//   return { data: [result1, result2] }
// },
