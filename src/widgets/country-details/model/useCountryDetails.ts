import { useParams } from 'react-router'

import { getOrDefault } from '@/shared/lib/utils/getOrDefault'
import { useGetCountryDetailsQuery } from '@/widgets/country-details/api/countryDetailsApi'

export function useCountryDetails() {
  const params = useParams()
  const countryCode = params.countryAlpha3Code
  // at moment of writing project country with code '' is exist in API (check in shared/mock)
  const country = useGetCountryDetailsQuery(countryCode ?? '', {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      country: getOrDefault(data?.objects?.[0], {}),
    }),
  })
  return { ...country, countryCode }
}
