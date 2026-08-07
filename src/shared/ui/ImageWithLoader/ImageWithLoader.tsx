import { createContext, use, useState } from 'react'

import styles from './ImageWithLoader.module.css'

// ImageWrapper
//  Image
//   Loader
//   ImageOnError
//   TextOnError
//  Image
// ImageWrapper

interface Value {
  isLoading: boolean
  isError: boolean
  handleLoad: () => void
}
const ImageContext = createContext<Value | null>(null)

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}
export function Image({
  src,
  alt,
  className = '',
  children,
  ...props
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const handleError = () => {
    setIsError(true)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <>
      {!isError && (
        <img
          src={src || 'errorSrc'} // to perform empty string
          alt={alt}
          className={`${styles.img} ${className}`}
          loading='lazy'
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      )}
      <ImageContext value={{ isLoading, isError, handleLoad }}>
        {children}
      </ImageContext>
    </>
  )
}

interface ImageWrapperProps {
  children: React.ReactNode
  aspectRatio?: string
  className?: string
  style?: React.CSSProperties
}
export function ImageWrapper({
  aspectRatio = '3/2',
  className = '',
  style = {},
  children,
}: ImageWrapperProps) {
  return (
    <div
      className={`${styles.imgWrapper} ${className}`}
      style={{ aspectRatio: aspectRatio, ...style }}
    >
      {children}
    </div>
  )
}

export function ImageOnError({
  src,
  alt,
  className = '',
  ...props
}: ImageProps) {
  const imageContext = use(ImageContext)
  return (
    imageContext?.isError && (
      <img
        src={src}
        alt={alt}
        className={`${styles.img} ${className}`}
        onLoad={imageContext?.handleLoad}
        {...props}
      />
    )
  )
}

export function TextOnError({ children }: { children: React.ReactNode }) {
  const imageContext = use(ImageContext)

  return imageContext?.isError && <p className={styles.noImgText}>{children}</p>
}

export function Loader({ children }: { children: React.ReactNode }) {
  const imageContext = use(ImageContext)
  return imageContext?.isLoading && children
}
