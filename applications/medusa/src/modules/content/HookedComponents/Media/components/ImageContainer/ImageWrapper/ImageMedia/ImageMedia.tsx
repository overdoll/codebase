import NextImage from './NextImage/NextImage'
import { ReactNode, useState } from 'react'
import ImageError from './ImageError/ImageError'
import { Flex } from '@chakra-ui/react'
import { ImageProps } from 'next/image'

export interface ImageMediaProps {
  url: string
  color?: string
  variants?: ReactNode
  tiny?: boolean
  width?: number
  height?: number
  loadFirst?: boolean
  unoptimized?: boolean
}

export default function ImageMedia (props: ImageMediaProps): JSX.Element {
  const {
    url,
    color,
    variants,
    tiny,
    width,
    height,
    loadFirst = false
  } = props

  const [hasError, setError] = useState(false)

  const IMAGE_STYLE: Omit<ImageProps, 'src'> = {
    style: {
      backgroundColor: color ?? 'transparent',
      userSelect: 'none',
      width: 'inherit',
      height: 'inherit',
      objectFit: 'inherit'
    },
    draggable: false,
    alt: 'image'
  }

  const onError = (): void => {
    setError(true)
  }

  if (hasError) {
    return (
      <Flex
        as='picture'
        h='inherit'
        w='inherit'
        align='center'
        justify='center'
        objectFit='inherit'
      >
        <ImageError tiny={tiny} />
        <NextImage
          src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
          loading='lazy'
          width={width ?? 1000}
          height={height ?? 1000}
          {...IMAGE_STYLE}
        />
      </Flex>
    )
  }

  if (variants == null) {
    return (
      <NextImage
        src={url ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        loading={loadFirst ? 'eager' : 'lazy'}
        priority={loadFirst}
        onError={onError}
        unoptimized
        width={width ?? 1000}
        height={height ?? 1000}
        {...IMAGE_STYLE}
      />
    )
  }

  return (
    <Flex
      as='picture'
      h='inherit'
      w='inherit'
      align='center'
      justify='center'
      objectFit='inherit'
    >
      {variants}
      <NextImage
        src={url ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        loading={loadFirst ? 'eager' : 'lazy'}
        priority={loadFirst}
        onError={onError}
        unoptimized
        width={width ?? 1000}
        height={height ?? 1000}
        {...IMAGE_STYLE}
      />
    </Flex>
  )
}
