import { useGetBordersNamesQuery } from '@/entities/borders/api'
import { getOrDefault } from '@/shared/lib/utils/getOrDefault'

import type { BorderCode } from './types'

export function useBorders(bordersCodes: BorderCode[]) {
  return useGetBordersNamesQuery(bordersCodes, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      borders: getOrDefault(
        data?.map((data) => data?.objects?.[0]),
        [],
      ),
    }),
  })
}
