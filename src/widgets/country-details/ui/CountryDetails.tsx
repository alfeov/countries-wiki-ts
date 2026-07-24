import { BorderCountries } from '@/entities/borders/ui/BorderCountries'
import { CountryInfo } from '@/entities/country/ui/CountryInfo/CountryInfo'
import { useScrollToTop } from '@/shared/lib/hooks/useScrollToTop'
import { formatApiError } from '@/shared/lib/utils/formatApiError'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'
import { FetchingIndicator } from '@/shared/ui/FetchingIndicator/FetchingIndicator'
import { SpinnerEmpty } from '@/shared/ui/SpinnerEmpty'
import { useCountry } from '@/widgets/country-details/model/useCountry'

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
  } = useCountry()

  return (
    <>
      <FetchingIndicator
        conditions={!isLoading && isFetching}
        wrapperClassName='pt-[4rem] md:pt-[5rem]'
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
      {!isSuccess && !isLoading && (
        <ErrorEmpty>Country with code {countryCode} not found (404)</ErrorEmpty>
      )}
    </>
  )
}
