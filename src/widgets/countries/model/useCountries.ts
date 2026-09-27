import { useSelector } from 'react-redux'

import { selectFilters } from '@/features/filters/model/filtersSlice'
import { useGetCountriesInfiniteQuery } from '@/widgets/countries/api/countriesApi'

export function useCountries() {
  const filters = useSelector(selectFilters)
  return useGetCountriesInfiniteQuery(filters, {
    selectFromResult: ({ data, ...rest }) => {
      return {
        ...rest,
        countries: data?.pages?.flatMap((page) => page?.objects) ?? [],
      }
    },
  })
}
