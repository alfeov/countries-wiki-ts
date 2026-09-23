import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'
import { renderWithRouter } from '@/test/renderWithRouter'

import { CountryInfo, type CountryInfoProps } from './CountryInfo'

const defaultProp: CountryInfoProps = {
  capitals: [{ name: 'Minsk' }],
  flag: { url_png: 'unknown' },
  names: { common: 'Belarus', official: 'Republic of Belarus' },
  subregion: '',
  area: { kilometers: 207600 },
  population: 9109280,
  region: 'Europe',
  currencies: [{ name: 'Belarusian ruble' }],
  languages: [{ name: 'Belarusian' }, { name: 'Russian' }],
  timezones: ['UTC+03:00'],
}

describe('CountryInfo', () => {
  it('should display formatted area and population', async () => {
    renderWithRouter(undefined, <CountryInfo {...defaultProp} />)
    expect(screen.getByText(/9,109,280/)).toBeInTheDocument()
    expect(screen.getByText(/207,600/)).toBeInTheDocument()
  })

  it('should display multiple capitals, currencies, languages, timezones separated by commas', () => {
    renderWithRouter(
      undefined,
      <CountryInfo
        {...defaultProp}
        capitals={[{ name: 'Minsk' }, { name: 'Pinsk' }]}
        currencies={[{ name: 'Belarusian ruble' }, { name: 'Russian ruble' }]}
        languages={[{ name: 'Belarusian' }, { name: 'Russian' }]}
        timezones={['UTC+03:00', 'UTC+03:00']}
      />,
    )

    expect(screen.getByText('Minsk, Pinsk')).toBeInTheDocument()
    expect(
      screen.getByText('Belarusian ruble, Russian ruble'),
    ).toBeInTheDocument()
    expect(screen.getByText('Belarusian, Russian')).toBeInTheDocument()
    expect(screen.getByText('UTC+03:00, UTC+03:00')).toBeInTheDocument()
  })

  it('should display "-" if capitals / currencies / languages / timezones / subregion is missing', () => {
    renderWithRouter(
      undefined,
      <CountryInfo
        {...defaultProp}
        capitals={[]}
        currencies={[]}
        languages={[]}
        timezones={[]}
        subregion=''
      />,
    )
    expect(screen.getByText('Capital:').closest('p')).toHaveTextContent(
      'Capital: -',
    )
    expect(screen.getByText('Currencies:').closest('p')).toHaveTextContent(
      'Currencies: -',
    )
    expect(screen.getByText('Languages:').closest('p')).toHaveTextContent(
      'Languages: -',
    )
    expect(screen.getByText('Timezones:').closest('p')).toHaveTextContent(
      'Timezones: -',
    )
    expect(screen.getByText('Sub Region:').closest('p')).toHaveTextContent(
      'Sub Region: -',
    )
  })

  it('should navigate to CountriesPage when clicked on Back btn ', async () => {
    renderWithProviders(undefined, undefined, <CountryInfo {...defaultProp} />)

    const link = screen.getByRole('link', { name: /back/i })
    await userEvent.click(link)

    expect(screen.getByTestId('countries-page')).toBeInTheDocument()
  })
})
