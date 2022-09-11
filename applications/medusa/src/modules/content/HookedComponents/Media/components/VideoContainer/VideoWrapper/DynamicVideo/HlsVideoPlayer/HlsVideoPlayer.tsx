import HlsPlayer from 'xgplayer-hls-vod'
import { useEffect, useRef } from 'react'
import { VideoContainerProps } from '../../../../../types'
import { VIDEO_OPTIONS } from '../../../../../constants'
import VideoBox from '../VideoBox/VideoBox'

interface Props extends VideoContainerProps {
  hlsUrl: string
}

export default function HlsVideoPlayer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    hlsUrl
  } = props

  const ref = useRef(null)

  useEffect(() => {
    const config = {
      el: ref.current,
      url: hlsUrl,
      ...VIDEO_OPTIONS
    }

    const player = new HlsPlayer(config)

    onPlayerInit(player)
  }, [hlsUrl])

  return (
    <VideoBox
      ref={ref}
    />
  )
}
