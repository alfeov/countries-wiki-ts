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
import {
  Image,
  ImageOnError,
  ImageWrapper,
  Loader,
  TextOnError,
} from '@/shared/ui/ImageWithLoader'
import { Skeleton } from '@/shared/ui/skeleton'

import noImage from '@/shared/assets/images/no-image.png'

export interface CountryItemProps extends CountryItem {
  ref: React.Ref<HTMLDivElement>
}

export function CountryItem({
  flag,
  names,
  population,
  region,
  capitals,
  codes,
  ref,
}: CountryItemProps) {
  return (
    <Card className='pt-0' ref={ref}>
      <ImageWrapper className='rounded-2xl'>
        <Image src={flag.url_png} alt={names.common}>
          <Loader>
            <Skeleton className='w-full m-5' />
          </Loader>
          <ImageOnError src={noImage} alt={names.common} />
          <TextOnError>{names.common}</TextOnError>
        </Image>
      </ImageWrapper>
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
              <strong>Capital: </strong>
              {capitals.map((capital) => capital.name).join(', ') || '-'}
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
