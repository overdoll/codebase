import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'
import { useRef, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import ImageError from '../NextImage/ImageError/ImageError'
import { useHydrate } from '../../../hydrate'

export type ImageSnippetProps = Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'>

export interface ImageSnippetCoverProps {
  cover?: boolean
  containCover?: boolean
  hideBackground?: boolean
  keepWidth?: boolean
}

interface Props extends ImageSnippetProps, ImageSnippetCoverProps {
  query: ImageSnippetFragment$key | null
  tinyError?: boolean
}

const Fragment = graphql`
  fragment ImageSnippetFragment on Resource {
    id
    urls {
      url
      mimeType
    }
    width
    height
    preview
  }
`

export default function ImageSnippet ({
  query,
  cover,
  tinyError,
  containCover,
  hideBackground = false,
  keepWidth,
  style,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const ref = useRef(null)

  const [hasError, setError] = useState(false)

  const determineCover = cover === true || (data?.width == null && data?.height == null)

  const previewBackground = hideBackground ? 'transparent' : (data?.preview != null && data?.preview !== '' ? data?.preview : 'gray.800')

  const tiniestImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

  const IMAGE_PROPS = {
    alt: '',
    width: data?.width,
    height: data?.height,
    style: {
      backgroundColor: previewBackground,
      userSelect: 'none' as any,
      width: keepWidth === true ? '100%' : (determineCover ? (containCover === true ? undefined : '100%') : '100%') as any,
      height: containCover === true ? undefined : '100%',
      objectFit: determineCover ? (containCover === true ? 'contain' : 'cover') : 'cover' as any,
      ...style
    },
    draggable: false
  }

  const isHydrated = useHydrate()

  const fallbackUrl = data?.urls[data.urls.length - 1]?.url

  const onError = (): void => {
    setError(true)
  }

  if (hasError) {
    return (
      <Flex justify='center' w='100%' h='100%' position='relative'>
        <NextImage
          loading={isHydrated ? 'lazy' : 'eager'}
          {...IMAGE_PROPS}
          src={tiniestImage}
          {...rest}
        />
        <Flex
          pointerEvents='none'
          top={0}
          right={0}
          w='100%'
          h='100%'
          position='absolute'
          align='center'
          justify='center'
        >
          <ImageError tiny={tinyError === true} />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      bg={previewBackground}
      w='100%'
      h='100%'
      justify='center'
      align='center'
    >
      <picture>
        {data?.urls.map((item) => (
          <source key={item.url} src={item.url} type={item.mimeType} />
        ))}
        <NextImage
          priority={!isHydrated}
          loading={isHydrated ? 'lazy' : 'eager'}
          ref={ref}
          src={fallbackUrl ?? tiniestImage}
          onError={onError}
          {...IMAGE_PROPS}
          {...rest}
        />
      </picture>
    </Flex>
  )
}
