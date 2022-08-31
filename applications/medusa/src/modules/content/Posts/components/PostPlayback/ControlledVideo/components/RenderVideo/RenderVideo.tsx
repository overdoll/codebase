import { Box, BoxProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { RenderVideoFragment$key } from '@//:artifacts/RenderVideoFragment.graphql'
import { forwardRef } from 'react'

interface Props extends BoxProps {
  onClick?: () => void
  muted?: boolean
  query: RenderVideoFragment$key
}

const Fragment = graphql`
  fragment RenderVideoFragment on Resource {
    videoThumbnail {
      url
    }
  }
`

const RenderVideo = forwardRef<any, Props>(({
  query,
  muted = true,
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
      height='100%'
      loop
      playsInline
      poster={data?.videoThumbnail?.url}
      draggable={false}
      {...rest}
    />
  )
})

export default RenderVideo
