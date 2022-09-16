import HlsPlayer from 'xgplayer-hls-vod'
import { useEffect, useRef } from 'react'
import { VideoContainerProps } from '../../../../../types'
import { VIDEO_OPTIONS } from '../../../../../constants'
import VideoBox from '../VideoBox/VideoBox'
import { VideoWatchProps } from '../../../VideoContainer'

interface Props extends VideoContainerProps, VideoWatchProps {
  hlsUrl: string
}

export default function HlsVideoPlayer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    hlsUrl,
    volume,
    muted,
    autoPlay,
    currentTime
  } = props

  const ref = useRef(null)

  useEffect(() => {
    const config = {
      el: ref.current,
      url: hlsUrl,
      autoPlay,
      ...VIDEO_OPTIONS
    }

    const player = new HlsPlayer(config)

    const onReady = (): void => {
      player.muted = muted
      player.volume = volume
      if (currentTime !== 0) {
        player.currentTime = currentTime
      }
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
