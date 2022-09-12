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

    const onReady = (): void => {
      player.video.muted = true
      player.video.volume = 0.1
      onPlayerInit(player)
    }

    player.once('ready', onReady)
    return () => {
      player.off('ready', onReady)
    }
  }, [hlsUrl])

  return (
    <VideoBox
      ref={ref}
    />
  )
}
