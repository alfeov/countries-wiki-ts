import { motion } from 'motion/react'
import { Link } from 'react-router'

import type { BorderCode } from '@/entities/borders/model'
import { useBorders } from '@/entities/borders/model/useBorders'
import { formatApiError } from '@/shared/lib/utils/formatApiError'
import {
  createMotionedComponent,
  itemVariants,
  listVariant,
} from '@/shared/lib/utils/motion'
import { Badge } from '@/shared/ui/badge'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'
import { Skeleton } from '@/shared/ui/skeleton'

import { ArrowUpRightIcon } from 'lucide-react'

const MotionLink = createMotionedComponent(Link)

interface BorderCountriesProps {
  bordersCodes: BorderCode[]
}

export function BorderCountries({ bordersCodes }: BorderCountriesProps) {
  const { borders, isError, isFetching, isSuccess, error } =
    useBorders(bordersCodes)

  return (
    <motion.div {...listVariant()} className='flex flex-wrap gap-3'>
      {isFetching &&
        bordersCodes?.map((border) => (
          <Skeleton
            className='h-7 w-25 rounded-3xl p-3 bg-muted-foreground dark:bg-muted'
            key={border + 'skeleton'}
          />
        ))}
      {isError && <ErrorEmpty>{formatApiError(error)}</ErrorEmpty>}
      {isSuccess &&
        !isFetching && // for prevent previous result showing
        borders.map((country) => (
          <MotionLink
            variants={itemVariants}
            to={'/' + country?.codes.alpha_3}
            key={country?.codes.alpha_3}
            className='w-fit rounded-3xl'
          >
            <Badge className='text-[14px] p-3 h-7'>
              {country?.names.common}
              <ArrowUpRightIcon data-icon='inline-end' />
            </Badge>
          </MotionLink>
        ))}
    </motion.div>
  )
}
