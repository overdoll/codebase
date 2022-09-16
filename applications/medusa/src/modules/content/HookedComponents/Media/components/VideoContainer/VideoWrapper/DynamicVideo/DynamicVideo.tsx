import dynamic from 'next/dynamic'
import { OnPlayerInitType } from '../../../../types'
import { VideoWatchProps } from '../../VideoContainer'

const DynamicMp4VideoPlayer = dynamic(
  async () => {
    return await import('./Mp4VideoPlayer/Mp4VideoPlayer')
  },
  {
    ssr: false
  }
)

const DynamicHlsVideoPlayer = dynamic(
  async () => {
    return await import('./HlsVideoPlayer/HlsVideoPlayer')
  },
  {
    ssr: false
  }
)

export interface CreateVideoProps {
  mp4Url?: string
  hlsUrl?: string
}

interface Props extends CreateVideoProps, VideoWatchProps {
  onPlayerInit: OnPlayerInitType
}

export default function DynamicVideo (props: Props): JSX.Element {
  const {
    onPlayerInit,
    mp4Url,
    hlsUrl,
    volume,
    muted,
    autoPlay,
    currentTime
  } = props

  // determine HLS or MP4 video here

  if (hlsUrl != null) {
    return (
      <DynamicHlsVideoPlayer
        currentTime={currentTime}
        autoPlay={autoPlay}
        volume={volume}
        muted={muted}
        hlsUrl={hlsUrl}
        onPlayerInit={(player) => onPlayerInit(player)}
      />
    )
  }

  if (mp4Url != null) {
    return (
      <DynamicMp4VideoPlayer
        currentTime={currentTime}
        autoPlay={autoPlay}
        volume={volume}
        muted={muted}
        mp4Url={mp4Url}
        onPlayerInit={(player) => onPlayerInit(player)}
      />
    )
  }

  return <></>
}
