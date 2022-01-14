import { createContext, ReactNode, useState } from 'react'
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
}

const defaultValue = {
  videoVolume: 1,
  videoMuted: false,
  changeVideoVolume: (e) => {
  }
}

export const VideoManagerContext = createContext<Context>(defaultValue)

export function VideoManagerProvider ({ children }: Props): JSX.Element {
  const history = useHistory()
  const currentHistory = history.location
  const state = currentHistory.state as VideoManagerState

  const [volume, setVolume] = useState(state?.videoVolume ?? 1)

  const [muted, setMuted] = useState(state?.videoMuted ?? true)

  const onChangeVolume = (e): void => {
    setVolume(e.target.volume)
    if (e.target.muted !== muted) {
      setMuted(e.target.muted)
    }
  }

  const contextValue = {
    videoVolume: volume,
    videoMuted: muted,
    changeVideoVolume: (volume) => onChangeVolume(volume)
  }

  return (
    <VideoManagerContext.Provider value={contextValue}>
      {children}
    </VideoManagerContext.Provider>
  )
}
