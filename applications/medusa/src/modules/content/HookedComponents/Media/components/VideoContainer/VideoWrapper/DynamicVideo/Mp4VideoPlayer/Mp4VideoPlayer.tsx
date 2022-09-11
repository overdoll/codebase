import Mp4Player from 'xgplayer-mp4'
import { useEffect, useRef } from 'react'
import { VideoContainerProps } from '../../../../../types'
import { VIDEO_OPTIONS } from '../../../../../constants'
import VideoBox from '../VideoBox/VideoBox'

interface Props extends VideoContainerProps {
  mp4Url: string
}

export default function Mp4VideoPlayer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    mp4Url
  } = props

  const ref = useRef(null)

  useEffect(() => {
    const config = {
      el: ref.current,
      url: mp4Url,
      maxBufferLength: 10,
      ...VIDEO_OPTIONS
    }

    const player = new Mp4Player(config)

    const onReady = (): void => {
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
