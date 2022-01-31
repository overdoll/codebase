import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { RenderVideoFragment$key } from '@//:artifacts/RenderVideoFragment.graphql'
import { MutableRefObject } from 'react'

interface Props extends HTMLChakraProps<any> {
  onClick?: () => void
  muted?: boolean
  sendRef?: MutableRefObject<any>
  query: RenderVideoFragment$key
}

const Fragment = graphql`
  fragment RenderVideoFragment on Resource {
    urls {
      url
      mimeType
    }
  }
`

export default function RenderVideo ({
  query,
  sendRef,
  muted = true,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box
      disablePictureInPicture
      controlsList='nodownload noremoteplayback noplaybackrate'
      as='video'
      ref={sendRef}
      muted={muted}
      bg='gray.800'
      loop
      preload='auto'
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
