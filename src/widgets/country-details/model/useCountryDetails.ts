import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'react-router'

import { useGetCountryDetailsQuery } from '@/widgets/country-details/api/countryDetailsApi'

export function useCountryDetails() {
  const params = useParams()
  const countryCode = params.countryAlpha3Code
  const country = useGetCountryDetailsQuery(countryCode ?? skipToken, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      country: data?.objects.length ? data.objects[0] : null,
    }),
  })
  return { ...country, countryCode }
}
