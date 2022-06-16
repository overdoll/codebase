import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
import NextImage from '../NextImage/NextImage'
import { ImageProps } from 'next/image'
import { Box } from '@chakra-ui/react'

interface Props extends Omit<ImageProps, 'src' | 'width' | 'height' | 'layout' | 'alt'> {
  innerRef?: () => void
  query: VideoSnippetFragment$key
}

const Fragment = graphql`
  fragment VideoSnippetFragment on Resource {
    videoThumbnail {
      url
    }
    preview
  }
`

export default function VideoSnippet ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box
      w='100%'
      h='100%'
      position='relative'
    >
      <NextImage
        alt='thumbnail'
        layout='fill'
        objectFit='cover'
        style={{
          backgroundColor: data?.preview != null && data?.preview !== '' ? data?.preview : 'none'
        }}
        objectPosition='50% 50%'
        src={data?.videoThumbnail?.url ?? ''}
        {...rest}
      />
    </Box>
  )
}
