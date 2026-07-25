import { motion } from 'motion/react'

import { CountryItem } from '@/entities/country/ui/CountryItem'
import { formatApiError } from '@/shared/lib/utils/formatApiError'
import {
  createMotionedComponent,
  itemVariants,
  listVariant,
} from '@/shared/lib/utils/motion'
import { Button } from '@/shared/ui/button'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'
import { FetchingIndicator } from '@/shared/ui/FetchingIndicator/FetchingIndicator'
import { SpinnerEmpty } from '@/shared/ui/SpinnerEmpty'
import { useCountries } from '@/widgets/countries/model/useCountries'

import styles from './CountriesList.module.css'

const MotionCountryItem = createMotionedComponent(CountryItem)

export function CountriesList() {
  const {
    countries,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
    hasNextPage,
    fetchNextPage,
  } = useCountries()

  return (
    <>
      <FetchingIndicator
        conditions={!isLoading && isFetching}
        wrapperClassName='pt-[14.5rem] md:pt-[7rem]'
      />
      {isLoading && <SpinnerEmpty>Loading countries</SpinnerEmpty>}
      {isError && <ErrorEmpty>{formatApiError(error)}</ErrorEmpty>}
      {isSuccess && countries?.length === 0 && (
        <ErrorEmpty>There are no countries for your query</ErrorEmpty>
      )}
      {isSuccess && (
        <motion.div {...listVariant()} className={styles.list}>
          {countries.map((country) => (
            <MotionCountryItem
              variants={itemVariants}
              key={country.codes.alpha_3}
              {...country}
            />
          ))}
        </motion.div>
      )}
      {isSuccess && hasNextPage && (
        <Button onClick={fetchNextPage}>Load more countries</Button>
      )}
    </>
  )
}
