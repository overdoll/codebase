import NextImage from './NextImage/NextImage'
import { ReactNode, useState } from 'react'
import ImageError from './ImageError/ImageError'
import { useHydrate } from '../../../../../../../hydrate'
import { Flex } from '@chakra-ui/react'

export interface ImageMediaProps {
  url: string
  color?: string
  variants?: ReactNode
  tiny?: boolean
  width?: number
  height?: number
}

export default function ImageMedia (props: ImageMediaProps): JSX.Element {
  const {
    url,
    color,
    variants,
    tiny,
    width,
    height
  } = props

  const [hasError, setError] = useState(false)

  const isHydrated = useHydrate()

  const onError = (): void => {
    setError(true)
  }

  if (hasError) {
    return (
      <ImageError tiny={tiny} />
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
        priority={!isHydrated}
        loading={isHydrated ? 'lazy' : 'eager'}
        src={url ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        onError={onError}
        width={width ?? undefined}
        height={height ?? undefined}
        style={{
          backgroundColor: color ?? 'transparent',
          userSelect: 'none',
          width: width == null ? 'inherit' : 'auto',
          height: height == null ? 'inherit' : 'auto',
          maxWidth: '100%',
          objectFit: 'inherit'
        }}
        draggable={false}
      />
    </Flex>
  )
}
