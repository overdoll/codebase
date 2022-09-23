import { createContext, ReactNode, useCallback, useState } from 'react'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'

interface Props {
  children: ReactNode
}

export interface VideoManagerContextType {
  volume: number
  muted: boolean
  setVolume: (volume: number) => void
  setMuted: (muted: boolean) => void
}

const defaultValue = {
  volume: 0.1,
  muted: true,
  setVolume: (volume) => {
  },
  setMuted: (muted) => {
  }
}

export const VideoManagerContext = createContext<VideoManagerContextType>(defaultValue)

export function VideoManagerProvider ({ children }: Props): JSX.Element {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage('globalVideoVolume', defaultValue.volume)
  const [globalVideoMuted, setGlobalVideoMuted] = useSessionStorage('globalVideoMuted', defaultValue.muted)

  const [volume, setVolume] = useState(globalVideoVolume)
  const [muted, setMuted] = useState(globalVideoMuted)

  const onChangeMuted = useCallback((muted: boolean) => {
    setMuted(muted)
    setGlobalVideoMuted(muted)
  }, [])

  const onChangeVolume = useCallback((volume: number) => {
    setVolume(volume)
    setGlobalVideoVolume(volume)
  }, [])

  const contextValue = {
    volume,
    muted,
    setVolume: (volume) => onChangeVolume(volume),
    setMuted: (muted) => onChangeMuted(muted)
  }

  return (
    <VideoManagerContext.Provider value={contextValue}>
      {children}
    </VideoManagerContext.Provider>
  )
}
