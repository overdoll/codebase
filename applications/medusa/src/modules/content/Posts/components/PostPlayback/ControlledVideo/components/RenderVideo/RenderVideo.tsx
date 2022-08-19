import { Box, BoxProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { RenderVideoFragment$key } from '@//:artifacts/RenderVideoFragment.graphql'
import { forwardRef } from 'react'

interface Props extends BoxProps {
  onClick?: () => void
  muted?: boolean
  query: RenderVideoFragment$key
  autoPlay: boolean | undefined
}

const Fragment = graphql`
  fragment RenderVideoFragment on Resource {
    urls {
      url
      mimeType
    }
    videoThumbnail {
      url
    }
    width
    height
  }
`

const RenderVideo = forwardRef<any, Props>(({
  query,
  muted = true,
  autoPlay,
  ...rest
}: Props, forwardRef): JSX.Element => {
  const data = useFragment(Fragment, query)

  return (
    <Box
      disablePictureInPicture
      controlsList='nodownload noremoteplayback noplaybackrate'
      as='video'
      ref={forwardRef}
      muted={muted}
      bg='gray.800'
      loop
      playsInline
      autoPlay={autoPlay}
      poster={data?.videoThumbnail?.url}
      {...rest}
    >
      {data.urls.map((item, index) => (
        <source
          width={data.width}
          height={data.height}
          key={index}
          src={item.url}
          type={item.mimeType}
        />)
      )}
    </Box>
  )
})

export default RenderVideo
