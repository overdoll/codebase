import HlsPlayer from 'xgplayer-hls.js'
import { useEffect, useRef } from 'react'
import { VideoContainerProps } from '../../../../../types'
import { VIDEO_OPTIONS } from '../../../../../constants'
import VideoBox from '../VideoBox/VideoBox'
import { VideoWatchProps } from '../../../VideoContainer'
import useSniffer from '../../../../../../../../hooks/useSniffer'

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

  const { os } = useSniffer()

  const ref = useRef(null)

  useEffect(() => {
    const config = {
      el: ref.current,
      url: hlsUrl,
      useHls: os.isPhone ? undefined : true,
      hlsOpts: {
        maxBufferLength: 1,
        maxMaxBufferLength: 6
      },
      volume,
      muted,
      autoplay: autoPlay,
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
    // use debug options below if needed for HLS
    // player.on('HLS_ERROR', info => console.log('HLS_ERROR', info))
    // player.on('media_info', info => console.log('media_info', info))
    // player.on('error', info => console.log('error', info))
    // player?.hls?.on('hlsError', (desc, error) => {
    //   console.log('hlsError', desc, error)
    // })
    // console.log(player.hls)
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
