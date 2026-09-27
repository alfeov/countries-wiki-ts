import { useGetBordersNamesQuery } from '@/entities/borders/api'

import type { BorderCode } from './types'

export function useBorders(borderCodes: BorderCode[]) {
  return useGetBordersNamesQuery(borderCodes, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      borders: data?.map((data) => data?.objects?.[0]) ?? [],
    }),
  })
}
