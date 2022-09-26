import dynamic from 'next/dynamic'
import { OnPlayerInitType } from '../../../../types'
import { VideoWatchProps } from '../../VideoContainer'
import useSniffer from '../../../../../../../hooks/useSniffer'

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
  hlsUrls?: {
    mobile?: string
    universal?: string
    desktop?: string
  }
}

interface Props extends CreateVideoProps, VideoWatchProps {
  onPlayerInit: OnPlayerInitType
}

export default function DynamicVideo (props: Props): JSX.Element {
  const {
    onPlayerInit,
    mp4Url,
    hlsUrls,
    volume,
    muted,
    autoPlay,
    currentTime
  } = props

  const { device } = useSniffer()

  const determineHlsUrl = (): string | null => {
    if (hlsUrls == null || Object.keys(hlsUrls).length < 1) return null
    if (device === 'mobile') {
      if (hlsUrls.mobile != null) {
        return hlsUrls.mobile
      } else if (hlsUrls.universal != null) {
        return hlsUrls.universal
      } else if (hlsUrls.desktop != null) {
        return hlsUrls.desktop
      }
    } else {
      if (hlsUrls.desktop != null) {
        return hlsUrls.desktop
      } else if (hlsUrls.universal != null) {
        return hlsUrls.universal
      } else if (hlsUrls.mobile != null) {
        return hlsUrls.mobile
      }
    }
    return null
  }

  const hlsUrl = determineHlsUrl()

  const defaultMuted = device === 'mobile' ? true : muted
  const defaultVolume = autoPlay ? 0 : (device === 'mobile' ? 0 : volume)

  if (hlsUrl != null) {
    return (
      <DynamicHlsVideoPlayer
        currentTime={currentTime}
        autoPlay={autoPlay}
        volume={defaultVolume}
        muted={defaultMuted}
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
        volume={defaultVolume}
        muted={defaultMuted}
        mp4Url={mp4Url}
        onPlayerInit={(player) => onPlayerInit(player)}
      />
    )
  }

  return <></>
}
