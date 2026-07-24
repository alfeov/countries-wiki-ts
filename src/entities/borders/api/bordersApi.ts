import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { Border, BorderCode } from '@/entities/borders/model'
import { api, type RawResultType, type ResultType } from '@/shared/api'

interface TempResult {
  data?: ResultType<Border[]>[]
  error?: unknown
}

const bordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBordersNames: build.query<ResultType<Border[]>[], BorderCode[]>({
      queryFn: async (bordersCodes, _, __, fetchWithBQ) => {
        const promises = bordersCodes.map((code) =>
          fetchWithBQ({
            url: `/codes.alpha_3/${code}`,
            params: {
              response_fields: 'names.common,codes.alpha_3',
            },
          }),
        )

        const result: TempResult = {
          error: 'Unknown error',
        }

        await Promise.all(promises)
          .then(
            (data) =>
              (result.data = data.map((data) => {
                if (data.data) {
                  const returnData = data.data as RawResultType<Border[]>
                  return returnData.data
                }
                throw new Error('Error in destructuring data: bordersApi')
              })),
          )
          .catch((error) => {
            if (error instanceof Error) result.error = error
          })

        return result.data
          ? { data: result.data }
          : { error: result.error as FetchBaseQueryError }
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
