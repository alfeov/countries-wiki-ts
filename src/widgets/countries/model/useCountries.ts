import { useSelector } from 'react-redux'

import { selectFilters } from '@/features/filters/model/filtersSlice'
import { getOrDefault } from '@/shared/lib/utils/getOrDefault'
import { useGetCountriesInfiniteQuery } from '@/widgets/countries/api/countriesApi'

export function useCountries() {
  const filters = useSelector(selectFilters)
  return useGetCountriesInfiniteQuery(filters, {
    selectFromResult: ({ data, ...rest }) => {
      return {
        ...rest,
        countries: getOrDefault(
          data?.pages?.flatMap((page) => page?.objects),
          [],
        ),
      }
    },
  })
}
