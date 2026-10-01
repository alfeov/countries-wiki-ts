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
  FallbackImage,
  FallbackText,
  Image,
  ImageWrapper,
  Loader,
} from '@/shared/ui/Image'
import { Skeleton } from '@/shared/ui/skeleton'

import noImage from '@/shared/assets/images/no-image.png'

export type CountryItemProps = CountryItem & React.ComponentProps<'div'>

export function CountryItem({
  flag,
  names,
  population,
  region,
  capitals,
  codes,
  ...props
}: CountryItemProps) {
  return (
    <Card className='pt-0' {...props}>
      <ImageWrapper className='rounded-2xl'>
        <Image src={flag.url_png} alt={names.common}>
          <Loader>
            <Skeleton className='w-full m-5' />
          </Loader>
          <FallbackImage src={noImage} alt={names.common} />
          <FallbackText>{names.common}</FallbackText>
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
        <Link to={'/' + codes.alpha_3} className='w-full rounded-4xl'>
          <Button className='w-full' tabIndex={-1}>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
