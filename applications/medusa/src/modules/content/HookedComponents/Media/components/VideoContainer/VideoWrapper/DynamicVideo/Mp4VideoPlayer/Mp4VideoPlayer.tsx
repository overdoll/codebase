import Player from 'xgplayer'
import { useEffect, useRef } from 'react'
import { VideoContainerProps } from '../../../../../types'
import { VIDEO_OPTIONS } from '../../../../../constants'
import VideoBox from '../VideoBox/VideoBox'
import { VideoWatchProps } from '../../../VideoContainer'

interface Props extends VideoContainerProps, VideoWatchProps {
  mp4Url: string
}

export default function Mp4VideoPlayer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    mp4Url,
    volume,
    muted,
    autoPlay,
    currentTime
  } = props

  const ref = useRef()

  useEffect(() => {
    const config = {
      el: ref.current,
      url: mp4Url,
      maxBufferLength: 10,
      volume,
      muted,
      autoplay: autoPlay,
      ...VIDEO_OPTIONS
    }

    const player = new Player(config)

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
  }, [mp4Url])

  return (
    <VideoBox
      ref={ref}
    />
  )
}
