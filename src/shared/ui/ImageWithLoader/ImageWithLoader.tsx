import { useState } from 'react'

import noImage from './no-image.png'

import styles from './ImageWithLoader.module.css'

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: React.ImgHTMLAttributes<HTMLImageElement>['src']
  alt: React.ImgHTMLAttributes<HTMLImageElement>['alt']
  children: React.ReactNode
  aspectRatio?: string
  noImageText?: string
  className?: string
  wrapperClassName?: string
  style?: React.CSSProperties
}

export function ImageWithLoader({
  src,
  alt,
  children,
  noImageText = '',
  aspectRatio = '3/2',
  className = '',
  wrapperClassName = '',
  style = {},
  ...props
}: ImageWithLoaderProps) {
  const [imgLoading, setImgLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  const handleError = () => {
    setImgError(true)
  }

  const handleLoad = () => {
    setImgLoading(false)
  }

  return (
    <div
      className={`${styles.imgWrapper} ${wrapperClassName}`}
      style={{ aspectRatio: aspectRatio }}
    >
      {imgLoading && children && children}
      {!imgError ? (
        <img
          src={src || 'errorSrc'} // to perform empty string
          alt={alt}
          className={`${styles.img} ${className}`}
          style={{
            width: imgLoading ? '0' : '100%',
            opacity: imgLoading ? '0' : '1',
            ...style,
          }}
          loading='lazy'
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      ) : (
        <>
          <img
            {...props}
            className={`${styles.img} ${className}`}
            style={{
              width: imgLoading ? '0' : '100%',
              opacity: imgLoading ? '0' : '1',
              ...style,
            }}
            src={noImage}
            onLoad={handleLoad}
          />
          <p
            className={styles.noImgText}
            style={{
              width: imgLoading ? '0' : '100%',
              opacity: imgLoading ? '0' : '1',
            }}
          >
            {noImageText}
          </p>
        </>
      )}
    </div>
  )
}
