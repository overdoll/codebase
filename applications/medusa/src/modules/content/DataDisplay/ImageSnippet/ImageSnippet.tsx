import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ImageError from '../NextImage/ImageError/ImageError'
import CanUseDOM from '../../../operations/CanUseDOM'
import { useHasMimeTypeAcceptHeader } from '../../../configuration'
import { useHydrate } from '../../../hydrate'

export interface ImageSnippetCoverProps {
  cover?: boolean
  containCover?: boolean
}

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'>, ImageSnippetCoverProps {
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

const errorCaptureCache = new Map<string, number>()

export default function ImageSnippet ({
  query,
  cover,
  tinyError,
  containCover,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const ref = useRef(null)

  const captureId = data?.id as string

  const [errorCount, setErrorCount] = useState(errorCaptureCache.has(captureId) ? errorCaptureCache.get(captureId) as number : 0)

  const errorLimit = data?.urls.length ?? 0

  const determineCover = cover === true || (data?.width == null && data?.height == null)

  const previewBackground = data?.preview != null && data?.preview !== '' ? data?.preview : 'gray.800'

  const tiniestImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

  const hasWebp = useHasMimeTypeAcceptHeader('image/webp')

  const IMAGE_PROPS = {
    alt: '',
    width: data?.width,
    height: data?.height,
    style: {
      backgroundColor: previewBackground,
      userSelect: 'none' as any,
      width: '100%',
      height: '100%',
      objectFit: determineCover ? (containCover === true ? 'contain' : 'cover') : 'cover' as any
    }
  }

  const isHydrated = useHydrate()

  const displayUrl = useMemo<string>(() => {
    if (errorCount >= errorLimit || data?.urls == null) {
      // return tiniest 1x1 base64 image as fallback because nextjs image doesn't like empty src values
      return tiniestImage
    }

    let targetUrl = data?.urls[errorCount]

    // display the next url if we don't have webp enabled for this client
    if (targetUrl.mimeType === 'image/webp' && !hasWebp) {
      targetUrl = data?.urls[errorCount + 1]
    }

    return targetUrl.url
  }, [errorCount, data?.urls])

  const onError = (): void => {
    setErrorCount(x => {
      const newValue = x + 1

      // add to error capture cache so that re-renders of the same image won't try to re-load the image
      if (CanUseDOM) {
        errorCaptureCache.set(captureId, newValue)
      }

      return newValue
    })
  }

  const onLoadingComplete = ({
    naturalWidth,
    naturalHeight
  }): void => {
    // if an error occurs on the server-side, do an onError call here
    if (naturalHeight === 0) {
      onError()
    }
  }

  if (errorCount >= errorLimit) {
    return (
      <Box w='100%' h='100%' position='relative'>
        <NextImage
          loading={isHydrated ? 'lazy' : 'eager'}
          {...IMAGE_PROPS}
          src={tiniestImage}
          {...rest}
        />
        <Flex top={0} right={0} w='100%' h='100%' position='absolute' align='center' justify='center'>
          <ImageError tiny={tinyError === true} />
        </Flex>
      </Box>
    )
  }

  return (
    <Box
      bg={previewBackground}
      w='100%'
      h='100%'
    >
      <NextImage
        priority={!isHydrated}
        loading={isHydrated ? 'lazy' : 'eager'}
        ref={ref}
        src={displayUrl}
        onLoadingComplete={onLoadingComplete}
        onError={onError}
        {...IMAGE_PROPS}
        {...rest}
      />
    </Box>
  )
}
