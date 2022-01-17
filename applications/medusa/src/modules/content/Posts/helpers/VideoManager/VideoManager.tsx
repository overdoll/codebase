import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { useHistory } from '../../../../routing'

interface Props {
  children: ReactNode
}

interface VideoManagerState {
  videoVolume?: number
  videoMuted?: boolean
}

interface Context {
  videoVolume: number
  videoMuted: boolean
  changeVideoVolume: (e) => void
  changeVideoMuted: (e) => void
  onVideoRun: (e) => void
}

const defaultValue = {
  videoVolume: 1,
  videoMuted: false,
  changeVideoVolume: (e) => {
  },
  changeVideoMuted: (e) => {
  },
  onVideoRun: (paused) => {
  }
}

export const VideoManagerContext = createContext<Context>(defaultValue)

export function VideoManagerProvider ({ children }: Props): JSX.Element {
  const history = useHistory()
  const currentHistory = history.location
  const state = currentHistory.state as VideoManagerState

  const [volume, setVolume] = useState(state?.videoVolume ?? 1)

  const [muted, setMuted] = useState(state?.videoMuted ?? true)

  const [activeVideo, setActiveVideo] = useState<HTMLVideoElement[]>([])

  const onChangeMuted = useCallback((isMuted) => {
    setMuted(isMuted)
  }, [])

  const onChangeVolume = useCallback((volume) => {
    setVolume(volume)
  }, [])

  const handleVideo = (e): void => {
    if (e.type === 'play') {
      setActiveVideo(x => {
        return [e.target, ...x]
      }
      )
    }
    if (e.type === 'pause') {
      setActiveVideo(x => {
        return x.filter((item) => item.currentSrc !== e.target.currentSrc)
      })
    }
  }

  useEffect(() => {
    if (activeVideo.length > 1) {
      activeVideo.slice(1).forEach((item) => {
        item.pause()
      })
    }
  }, [activeVideo])

  const contextValue = {
    videoVolume: volume,
    videoMuted: muted,
    changeVideoVolume: (volume) => onChangeVolume(volume),
    changeVideoMuted: (volume) => onChangeMuted(volume),
    onVideoRun: (e) => handleVideo(e)
  }

  return (
    <VideoManagerContext.Provider value={contextValue}>
      {children}
    </VideoManagerContext.Provider>
  )
}
