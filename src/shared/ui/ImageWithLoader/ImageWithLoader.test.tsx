import { fireEvent, render, screen } from '@testing-library/react'

import {
  Image,
  ImageOnError,
  ImageWrapper,
  Loader,
  TextOnError,
} from './ImageWithLoader'

describe('ImageWithLoader', () => {
  beforeEach(() => {
    render(
      <ImageWrapper>
        <Image src='' alt='altname' data-testid='primary-image'>
          <Loader>Loading...</Loader>
          <ImageOnError
            src='fallback.test.jpg'
            alt='fallback'
            data-testid='fallback-image'
          />
          <TextOnError>Error text...</TextOnError>
        </Image>
      </ImageWrapper>,
    )
  })

  it('should replace empty src="" with src="errorSrc" to show fallback', () => {
    expect(screen.getByTestId('primary-image')).toHaveAttribute(
      'src',
      'errorSrc',
    )
  })

  it('primary image should not be visible and have width 0 during loading to prevent loader shifts', () => {
    expect(screen.getByTestId('primary-image')).not.toBeVisible()
    expect(screen.getByTestId('primary-image')).toHaveStyle('width: 0')

    fireEvent.load(screen.getByTestId('primary-image'))

    expect(screen.getByTestId('primary-image')).toBeVisible()
    expect(screen.getByTestId('primary-image')).toHaveStyle('width: 100%')
  })

  it('should render loader until primary image will be loaded', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    fireEvent.load(screen.getByTestId('primary-image'))

    expect(screen.queryByText('Loading...')).toBeNull()
  })
  it('should still render loader until fallback image will be loaded', () => {
    fireEvent.error(screen.getByTestId('primary-image'))
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    fireEvent.load(screen.getByTestId('fallback-image'))
    expect(screen.queryByText('Loading...')).toBeNull()
  })

  it('should render fallback image with error text on error', () => {
    expect(screen.queryByTestId('fallback-image')).toBeNull()
    expect(screen.queryByText('Error text...')).toBeNull()

    fireEvent.error(screen.getByTestId('primary-image'))
    fireEvent.load(screen.getByTestId('fallback-image'))

    expect(screen.getByTestId('fallback-image')).toBeVisible()
    expect(screen.getByText('Error text...')).toBeVisible()
  })
})
