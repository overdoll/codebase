import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { VideoSnippetFragment$key } from '@//:artifacts/VideoSnippetFragment.graphql'
import { useRef } from 'react'

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

  const ref = useRef(null)

  // TODO add a placeholder in case the URL fails to load due to some error

  return (
    <Box
      as='video'
      ref={ref}
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
          src={item.url}
          type={item.mimeType}
        />)
      )}
    </Box>
  )
}
