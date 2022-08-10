import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'
import { Box } from '@chakra-ui/react'
import { useHydrate } from '../../../hydrate'
import { ImageSnippetCoverProps } from '../ImageSnippet/ImageSnippet'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'>, ImageSnippetCoverProps {
  innerRef?: () => void
  query: VideoSnippetFragment$key
}

const Fragment = graphql`
  fragment VideoSnippetFragment on Resource {
    videoThumbnail {
      url
    }
    preview
    width
    height
  }
`

export default function VideoSnippet ({
  query,
  cover,
  containCover,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const isHydrated = useHydrate()

  const determineCover = cover === true || (data?.width == null && data?.height == null)

  const previewBackground = data?.preview != null && data?.preview !== '' ? data?.preview : 'gray.800'

  return (
    <Box
      w='100%'
      h='100%'
      bg={previewBackground}
    >
      <NextImage
        alt=''
        loading={isHydrated ? 'lazy' : 'eager'}
        width={data?.width}
        height={data?.height}
        style={{
          backgroundColor: previewBackground,
          userSelect: 'none',
          width: '100%',
          height: '100%',
          objectFit: determineCover ? (containCover === true ? 'contain' : 'cover') : 'cover' as any
        }}
        src={data?.videoThumbnail?.url ?? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        {...rest}
      />
    </Box>
  )
}
