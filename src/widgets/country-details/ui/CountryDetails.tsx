import { BorderCountries } from '@/entities/borders/ui/BorderCountries'
import { CountryInfo } from '@/entities/country/ui/CountryInfo/CountryInfo'
import { useScrollToTop } from '@/shared/lib/hooks/useScrollToTop'
import { formatApiError } from '@/shared/lib/utils/formatApiError'
import { AnimatedFetchingIndicator } from '@/shared/ui/AnimatedFetchingIndicator'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'
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
      <AnimatedFetchingIndicator
        conditions={!isLoading && isFetching}
        className='pt-10 md:pt-12'
      />
      {isLoading && (
        <SpinnerEmpty>Loading country with code {countryCode}</SpinnerEmpty>
      )}
      {isError && <ErrorEmpty>{formatApiError(error)}</ErrorEmpty>}
      {isSuccess && country && (
        <CountryInfo {...country}>
          {Boolean(country.borders.length) && (
            <footer className='grid gap-5'>
              <h2 className='text-[24px] font-semibold'>Border Countries:</h2>
              <BorderCountries bordersCodes={country.borders} />
            </footer>
          )}
        </CountryInfo>
      )}
      {isSuccess && !country && (
        <ErrorEmpty>Country with code {countryCode} not found (404)</ErrorEmpty>
      )}
    </>
  )
}
