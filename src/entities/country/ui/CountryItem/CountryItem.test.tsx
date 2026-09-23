import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRouter } from '@/test/renderWithRouter'

import { CountryItem, type CountryItemProps } from './CountryItem'

const defaultProps: CountryItemProps = {
  capitals: [{ name: 'Minsk' }],
  codes: { alpha_3: 'BLR' },
  flag: { url_png: 'unknown' },
  names: { common: 'Belarus' },
  population: 9109280,
  ref: null,
  region: 'Europe',
}

describe('CountryItem', () => {
  it('should display formatted population', () => {
    renderWithRouter(undefined, <CountryItem {...defaultProps} />)
    expect(screen.getByText('9,109,280')).toBeInTheDocument()
  })

  it('should display multiple capitals separated by commas', () => {
    renderWithRouter(
      undefined,
      <CountryItem
        {...defaultProps}
        capitals={[{ name: 'Minsk' }, { name: 'Pinsk' }]}
      />,
    )
    expect(screen.getByText('Minsk, Pinsk')).toBeInTheDocument()
  })

  it('should display "-" if capitals is missing', () => {
    renderWithRouter(undefined, <CountryItem {...defaultProps} capitals={[]} />)
    expect(screen.getByText('Capital:').closest('li')).toHaveTextContent(
      'Capital: -',
    )
  })

  it('link "View Details" should navigate to country details page', async () => {
    const { router } = renderWithRouter(
      undefined,
      <CountryItem {...defaultProps} codes={{ alpha_3: 'BLR' }} />,
    )

    const link = screen.getByRole('link', { name: /view details/i })
    await userEvent.click(link)

    expect(router.state.location.pathname).toContain('BLR')
  })
})
