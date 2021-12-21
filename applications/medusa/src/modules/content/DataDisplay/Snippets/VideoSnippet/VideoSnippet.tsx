import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'

interface Props extends HTMLChakraProps<any> {
  innerRef?: () => void
  query: VideoSnippetFragment$key
}

const Fragment = graphql`
  fragment VideoSnippetFragment on Resource {
    urls {
      url
      mimeType
    }
  }
`

export default function VideoSnippet ({
  query,
  innerRef,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box
      as='video'
      ref={innerRef}
      disablePictureInPicture
      controlsList='nodownload noremoteplayback noplaybackrate'
      muted
      loop
      preload='auto'
      h='100%'
      objectFit='cover'
      {...rest}
    >
      {data.urls.map((item, index) => (
        <source
          key={index}
          src={item.url as string}
          type={item.mimeType}
        />)
      )}
    </Box>
  )
}
