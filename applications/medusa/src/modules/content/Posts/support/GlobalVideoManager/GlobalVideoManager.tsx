import { createContext, ReactNode, useCallback, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface Props {
  children: ReactNode
}

interface Context {
  videoVolume: number
  videoMuted: boolean
  changeVideoVolume: (e) => void
  changeVideoMuted: (e) => void
}

const defaultValue = {
  videoVolume: 0.1,
  videoMuted: true,
  changeVideoVolume: (e) => {
  },
  changeVideoMuted: (e) => {
  },
  observerRoot: { current: null }
}

export const GlobalVideoManagerContext = createContext<Context>(defaultValue)

export function GlobalVideoManagerProvider ({ children }: Props): JSX.Element {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage('globalVideoVolume', defaultValue.videoVolume)
  const [volume, setVolume] = useState(globalVideoVolume)
  const [muted, setMuted] = useState(defaultValue.videoMuted)

  const onChangeMuted = useCallback((isMuted: any) => {
    setMuted(isMuted)
  }, [])

  const onChangeVolume = useCallback((volume: any) => {
    setVolume(volume)
    setGlobalVideoVolume(volume)
  }, [])

  const contextValue = {
    videoVolume: volume,
    videoMuted: muted,
    changeVideoVolume: (volume) => onChangeVolume(volume),
    changeVideoMuted: (volume) => onChangeMuted(volume)
  }

  return (
    <GlobalVideoManagerContext.Provider value={contextValue}>
      {children}
    </GlobalVideoManagerContext.Provider>
  )
}
