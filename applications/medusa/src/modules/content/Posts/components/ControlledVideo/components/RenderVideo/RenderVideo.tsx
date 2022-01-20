import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { RenderVideoFragment$key } from '@//:artifacts/RenderVideoFragment.graphql'
import { MutableRefObject, ReactEventHandler } from 'react'

interface Props extends HTMLChakraProps<any> {
  onClick?: () => void
  muted?: boolean
  sendRef?: MutableRefObject<any>
  query: RenderVideoFragment$key
  onLoadedData?: ReactEventHandler<HTMLDivElement>
  onPlay?: ReactEventHandler<HTMLDivElement>
  onPause?: ReactEventHandler<HTMLDivElement>
  onTimeUpdate?: ReactEventHandler<HTMLDivElement>
  onVolumeChange?: ReactEventHandler<HTMLDivElement>
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
  onClick,
  onPlay,
  onPause,
  onLoadedData,
  onTimeUpdate,
  onVolumeChange,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box
      as='video'
      ref={sendRef}
      muted={muted}
      onLoadedData={onLoadedData}
      onPlay={onPlay}
      onPause={onPause}
      onTimeUpdate={onTimeUpdate}
      onVolumeChange={onVolumeChange}
      onClick={onClick}
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
