import { ArrowUpRightIcon } from 'lucide-react'
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

const MotionLink = createMotionedComponent(Link)

interface BorderCountriesProps {
  bordersCodes: BorderCode[]
}

export function BorderCountries({ bordersCodes }: BorderCountriesProps) {
  const { borders, isError, isFetching, isSuccess, error } =
    useBorders(bordersCodes)

  return (
    <footer className='grid gap-[20px]'>
      <h2 className='text-[24px] font-[600]'>Border Countries:</h2>
      <motion.div {...listVariant()} className='flex flex-wrap gap-[10px]'>
        {isFetching &&
          bordersCodes?.map((border) => (
            <Skeleton
              className='h-[26px] w-[100px] rounded-3xl p-[12px] bg-muted-foreground dark:bg-muted'
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
              <Badge className='text-[14px] p-[12px] h-[26px]'>
                {country?.names.common}
                <ArrowUpRightIcon data-icon='inline-end' />
              </Badge>
            </MotionLink>
          ))}
      </motion.div>
    </footer>
  )
}
