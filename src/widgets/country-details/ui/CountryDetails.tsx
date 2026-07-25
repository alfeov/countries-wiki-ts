import { BorderCountries } from '@/entities/borders/ui/BorderCountries'
import { CountryInfo } from '@/entities/country/ui/CountryInfo/CountryInfo'
import { useScrollToTop } from '@/shared/lib/hooks/useScrollToTop'
import { formatApiError } from '@/shared/lib/utils/formatApiError'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'
import { FetchingIndicator } from '@/shared/ui/FetchingIndicator/FetchingIndicator'
import { SpinnerEmpty } from '@/shared/ui/SpinnerEmpty'
import { useCountryDetails } from '@/widgets/country-details/model/useCountryDetails'

export function CountryDetails() {
  useScrollToTop()
  const {
    country,
    countryCode,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
  } = useCountryDetails()

  return (
    <>
      <FetchingIndicator
        conditions={!isLoading && isFetching}
        wrapperClassName='pt-[40px] md:pt-[50px]'
      />
      {isLoading && (
        <SpinnerEmpty>Loading country with code {countryCode}</SpinnerEmpty>
      )}
      {isError && <ErrorEmpty>{formatApiError(error)}</ErrorEmpty>}
      {isSuccess && 'names' in country && (
        <CountryInfo country={country}>
          {!!country.borders.length && (
            <BorderCountries bordersCodes={country.borders} />
          )}
        </CountryInfo>
      )}
      {isSuccess && !isLoading && !('names' in country) && (
        <ErrorEmpty>Country with code {countryCode} not found (404)</ErrorEmpty>
      )}
    </>
  )
}
