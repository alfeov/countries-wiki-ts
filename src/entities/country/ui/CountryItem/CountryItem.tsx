import { Link } from 'react-router'

import type { CountryItem } from '@/entities/country/model/types'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import { Skeleton } from '@/shared/ui/skeleton'

interface CountryItemProps extends CountryItem {
  ref: React.Ref<HTMLDivElement>
}

export function CountryItem(props: CountryItemProps) {
  const { flag, names, population, region, capitals, codes, ref } = props

  return (
    <Card className='pt-0' ref={ref}>
      <ImageWithLoader
        src={flag.url_png || 'errorSrc'} // to perform empty string
        alt={names.common}
        noImageText={names.common}
        aspectRatio='3/2'
      >
        <Skeleton className='w-full m-[20px]' />
      </ImageWithLoader>
      <CardHeader className='grow'>
        <CardTitle>{names.common}</CardTitle>
        <CardDescription>
          <ul>
            <li>
              <strong>Population:</strong> {population.toLocaleString('en-US')}
            </li>
            <li>
              <strong>Region:</strong> {region}
            </li>
            <li>
              <strong>Capital:</strong>{' '}
              {capitals.map((capital) => capital.name).join(', ')}
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={codes.alpha_3} className='w-full rounded-4xl'>
          <Button className='w-full' tabIndex={-1}>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
