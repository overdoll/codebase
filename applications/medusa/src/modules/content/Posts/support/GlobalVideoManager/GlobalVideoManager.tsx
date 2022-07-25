import { createContext, ReactNode, useCallback, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface Props {
  children: ReactNode
}

interface Context {
  videoVolume: number
  videoMuted: boolean
  videoPlaying: string
  changeVideoVolume: (e) => void
  changeVideoMuted: (e) => void
  onPlayVideo: (resourceId: string) => void
  onPauseVideo: (resourceId: string) => void
}

const defaultValue = {
  videoVolume: 0.1,
  videoMuted: true,
  videoPlaying: '',
  changeVideoVolume: (e) => {
  },
  changeVideoMuted: (e) => {
  },
  onPlayVideo: (e) => {
  },
  onPauseVideo: (e) => {
  }
}

export const GlobalVideoManagerContext = createContext<Context>(defaultValue)

export function GlobalVideoManagerProvider ({ children }: Props): JSX.Element {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage('globalVideoVolume', defaultValue.videoVolume)
  const [volume, setVolume] = useState(globalVideoVolume)
  const [muted, setMuted] = useState(defaultValue.videoMuted)
  const [playing, setPlaying] = useState<string>('')

  const onChangeMuted = useCallback((isMuted) => {
    setMuted(isMuted)
  }, [])

  const onChangeVolume = useCallback((volume) => {
    setVolume(volume)
    setGlobalVideoVolume(volume)
  }, [])

  const onPlayVideo = useCallback((resourceId) => {
    setPlaying(resourceId)
  }, [])

  const onPauseVideo = useCallback((resourceId) => {
    if (resourceId === playing) {
      setPlaying('')
    }
  }, [playing])

  const contextValue = {
    videoVolume: volume,
    videoMuted: muted,
    videoPlaying: playing,
    changeVideoVolume: (volume) => onChangeVolume(volume),
    changeVideoMuted: (volume) => onChangeMuted(volume),
    onPlayVideo: (resourceId) => onPlayVideo(resourceId),
    onPauseVideo: (resourceId) => onPauseVideo(resourceId)
  }

  return (
    <GlobalVideoManagerContext.Provider value={contextValue}>
      {children}
    </GlobalVideoManagerContext.Provider>
  )
}
