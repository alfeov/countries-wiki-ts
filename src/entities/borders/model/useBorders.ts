import { useGetBordersNamesQuery } from '@/entities/borders/api'

import type { BorderCode } from './types'

export function useBorders(bordersCodes: BorderCode[]) {
  return useGetBordersNamesQuery(bordersCodes, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      borders: data?.map((data) => data?.objects?.[0]) ?? [],
    }),
  })
}
