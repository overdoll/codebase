import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'
import { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import ImageError from '../NextImage/ImageError/ImageError'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
  query: ImageSnippetFragment$key | null
  cover?: boolean
}

const Fragment = graphql`
  fragment ImageSnippetFragment on Resource {
    urls {
      url
    }
    width
    height
    preview
  }
`

export default function ImageSnippet ({
  query,
  cover,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [errorCount, setErrorCount] = useState(0)

  const errorLimit = data?.urls.length ?? 0

  const IMAGE_PROPS = {
    alt: 'thumbnail',
    width: cover === true ? undefined : data?.width,
    height: cover === true ? undefined : data?.height,
    layout: cover === true ? 'fill' : 'intrinsic' as any,
    objectFit: 'cover' as any,
    objectPosition: '50% 50%'
  }

  const displayUrl = (currentErrorCount): string => {
    if (currentErrorCount >= errorLimit || data?.urls == null) {
      // return tiniest 1x1 base64 image as fallback because nextjs image doesn't like empty src values
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    }

    return data?.urls[errorCount].url
  }

  const onErrorCapture = (): void => {
    setErrorCount(x => x + 1)
  }

  if (errorCount >= errorLimit) {
    return (
      <Flex h='100%'>
        <ImageError />
      </Flex>
    )
  }

  return (
    <Flex justify='center' w='100%' h='100%' position={cover === true ? 'relative' : 'static'}>
      <NextImage
        {...IMAGE_PROPS}
        style={{
          backgroundColor: data?.preview != null && data?.preview !== '' ? data?.preview : 'none'
        }}
        src={displayUrl(errorCount)}
        onErrorCapture={onErrorCapture}
        {...rest}
      />
    </Flex>
  )
}
