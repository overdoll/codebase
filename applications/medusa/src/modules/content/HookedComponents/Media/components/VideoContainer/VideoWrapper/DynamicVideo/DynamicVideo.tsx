import dynamic from 'next/dynamic'
import { OnPlayerInitType } from '../../../../types'

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

interface Props extends CreateVideoProps {
  onPlayerInit: OnPlayerInitType
}

export default function DynamicVideo (props: Props): JSX.Element {
  const {
    onPlayerInit,
    mp4Url,
    hlsUrl
  } = props

  // determine HLS or MP4 video here
  if (mp4Url != null) {
    return (
      <DynamicMp4VideoPlayer
        mp4Url={mp4Url}
        onPlayerInit={(player) => onPlayerInit(player)}
      />
    )
  }

  if (hlsUrl != null) {
    return (
      <DynamicHlsVideoPlayer
        hlsUrl={hlsUrl}
        onPlayerInit={(player) => onPlayerInit(player)}
      />
    )
  }

  return <></>
}
