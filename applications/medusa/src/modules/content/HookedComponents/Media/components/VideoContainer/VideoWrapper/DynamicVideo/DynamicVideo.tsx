import dynamic from 'next/dynamic'
import { useState } from 'react'

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
  onPlayerInit: (player) => void
}

export default function DynamicVideo (props: Props): JSX.Element {
  const {
    onPlayerInit,
    mp4Url,
    hlsUrl
  } = props

  const [player, setPlayer] = useState(null)

  const setPlayers = (player): void => {
    setPlayer(player)
    onPlayerInit(player)
  }

  // determine HLS or MP4 video here
  if (mp4Url != null) {
    return (
      <DynamicMp4VideoPlayer
        mp4Url={mp4Url}
        onPlayerInit={(player) => setPlayers(player)}
      />
    )
  }

  if (hlsUrl != null) {
    return (
      <DynamicHlsVideoPlayer
        hlsUrl={hlsUrl}
        onPlayerInit={(player) => setPlayers(player)}
      />
    )
  }

  return <></>
}
