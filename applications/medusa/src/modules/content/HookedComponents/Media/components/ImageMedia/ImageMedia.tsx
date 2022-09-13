import NextImage from './NextImage/NextImage'
import { ReactNode, useState } from 'react'
import ImageError from './ImageError/ImageError'
import { useHydrate } from '../../../../../hydrate'
import { Flex, useToken } from '@chakra-ui/react'

interface Props {
  url: string
  color?: string
  variants?: ReactNode
}

export default function ImageMedia (props: Props): JSX.Element {
  const {
    url,
    color,
    variants
  } = props

  const [hasError, setError] = useState(false)

  const isHydrated = useHydrate()

  const [gray] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['gray.800']
    // a single fallback or fallback array matching the length of the previous arg
  )

  const onError = (): void => {
    setError(true)
  }

  if (hasError) {
    return (
      <ImageError />
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
        style={{
          backgroundColor: color ?? gray,
          userSelect: 'none',
          maxWidth: '100%',
          height: 'inherit',
          width: 'inherit',
          objectFit: 'inherit'
        }}
        draggable={false}
      />
    </Flex>
  )
}
