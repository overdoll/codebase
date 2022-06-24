import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'
import { useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ImageError from '../NextImage/ImageError/ImageError'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
  query: ImageSnippetFragment$key | null
  cover?: boolean
  tinyError?: boolean
}

const Fragment = graphql`
  fragment ImageSnippetFragment on Resource {
    id
    urls {
      url
    }
    width
    height
    preview
  }
`

const errorCaptureCache = new Map<string, number>()

export default function ImageSnippet ({
  query,
  cover,
  tinyError,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const captureId = data?.id as string

  const [errorCount, setErrorCount] = useState(errorCaptureCache.has(captureId) ? errorCaptureCache.get(captureId) as number : 0)

  const errorLimit = data?.urls.length ?? 0

  const determineCover = cover === true || (data?.width == null && data?.height == null)

  const previewBackground = data?.preview != null && data?.preview !== '' ? data?.preview : 'gray.800'

  const tiniestImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

  const IMAGE_PROPS = {
    alt: '',
    layout: determineCover ? 'fill' : 'responsive' as any,
    width: determineCover ? undefined : data?.width,
    height: determineCover ? undefined : data?.height,
    objectFit: determineCover ? 'cover' : undefined as any,
    style: {
      backgroundColor: previewBackground,
      userSelect: 'none' as any
    }
  }

  const displayUrl = (currentErrorCount): string => {
    if (currentErrorCount >= errorLimit || data?.urls == null) {
      // return tiniest 1x1 base64 image as fallback because nextjs image doesn't like empty src values
      return tiniestImage
    }

    return data?.urls[errorCount].url
  }

  const onErrorCapture = (): void => {
    setErrorCount(x => {
      const newValue = x + 1

      // add to error capture cache so that re-renders of the same image won't try to re-load the image
      errorCaptureCache.set(captureId, newValue)
      return newValue
    })
  }

  if (errorCount >= errorLimit) {
    return (
      <Box w='100%' h='100%' position='relative'>
        <Box
          bg={previewBackground}
          position={determineCover ? 'relative' : 'static'}
          display='block'
          w='100%'
          h='100%'
        >
          <NextImage
            {...IMAGE_PROPS}
            src={tiniestImage}
            {...rest}
          />
        </Box>
        <Flex top={0} right={0} w='100%' h='100%' position='absolute' align='center' justify='center'>
          <ImageError tiny={tinyError === true} />
        </Flex>
      </Box>
    )
  }

  return (
    <Box position={determineCover ? 'relative' : 'static'} w='100%' h='100%' display='block'>
      <NextImage
        {...IMAGE_PROPS}
        src={displayUrl(errorCount)}
        onErrorCapture={onErrorCapture}
        {...rest}
      />
    </Box>
  )
}
