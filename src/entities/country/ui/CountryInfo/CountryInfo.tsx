import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'

import type { Country } from '@/entities/country/model/types'
import noImage from '@/shared/assets/images/no-image.png'
import { createMotionedComponent, sideVariant } from '@/shared/lib/utils/motion'
import { Button } from '@/shared/ui/button'
import {
  Image,
  ImageOnError,
  ImageWrapper,
  Loader,
  TextOnError,
} from '@/shared/ui/ImageWithLoader'
import { Skeleton } from '@/shared/ui/skeleton'

const MotionLink = createMotionedComponent(Link)

interface CountryInfoProps {
  country: Country
  children: React.ReactNode
}

export function CountryInfo({ country, children }: CountryInfoProps) {
  const {
    flag,
    names,
    population,
    region,
    subregion,
    capitals,
    currencies,
    timezones,
    area,
    languages,
  } = country

  return (
    <>
      <div className='grid gap-[30px] overflow-hidden'>
        <MotionLink to='/' className='w-fit rounded-4xl' {...sideVariant(-200)}>
          <Button tabIndex={-1}>
            <ArrowLeft data-icon='inline-start' />
            Back
          </Button>
        </MotionLink>
        <div className='grid gap-[30px] lg:gap-[40px] lg:grid-cols-2'>
          <motion.div {...sideVariant(-200)}>
            <ImageWrapper className='rounded-2xl'>
              <Image src={flag.url_png} alt={names.common}>
                <Loader>
                  <Skeleton className='w-full bg-muted-foreground dark:bg-muted' />
                </Loader>
                <ImageOnError src={noImage} alt={names.common} />
                <TextOnError>{names.common}</TextOnError>
              </Image>
            </ImageWrapper>
          </motion.div>
          <motion.article
            {...sideVariant(200)}
            className='grid gap-[20px] content-start'
          >
            <header>
              <h1 className='text-[30px] font-[600]'>{names.common}</h1>
            </header>
            <main className='grid gap-[20px] lg:grid-cols-2'>
              <div>
                <p>
                  <strong>Official Name: </strong>
                  {names.official}
                </p>
                <p>
                  <strong>Population: </strong>
                  {population.toLocaleString('en-US')}
                </p>
                <p>
                  <strong>Region: </strong>
                  {region}
                </p>
                <p>
                  <strong>Sub Region: </strong>
                  {subregion || '-'}
                </p>
                <p>
                  <strong>Capital: </strong>
                  {capitals.map((capital) => capital.name)?.join(', ') || '-'}
                </p>
              </div>
              <div>
                <p>
                  <strong>Currencies: </strong>
                  {currencies.map((currency) => currency.name)?.join(', ') ||
                    '-'}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {languages.map((language) => language.name)?.join(', ') ||
                    '-'}
                </p>
                <p>
                  <strong>Timezones: </strong>
                  {timezones.join(', ')}
                </p>
                <p>
                  <strong>Area: </strong>
                  {area.kilometers.toLocaleString('en-US')}km&sup2;
                </p>
              </div>
            </main>
            {children}
          </motion.article>
        </div>
      </div>
    </>
  )
}
