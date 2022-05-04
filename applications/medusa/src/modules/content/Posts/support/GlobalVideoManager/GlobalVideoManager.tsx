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
  }
}

export const GlobalVideoManagerContext = createContext<Context>(defaultValue)

export function GlobalVideoManagerProvider ({ children }: Props): JSX.Element {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage('globalVideoVolume', defaultValue.videoVolume)

  const [volume, setVolume] = useState(globalVideoVolume)
  const [muted, setMuted] = useState(defaultValue.videoMuted)

  const onChangeMuted = useCallback((isMuted) => {
    setMuted(isMuted)
  }, [])

  const onChangeVolume = useCallback((volume) => {
    setVolume(volume)
    setGlobalVideoVolume(volume)
  }, [])

  /*

  const removeKeyFromObject = (key, object): SingleVideoState => {
    const newObject = {}
    Object.keys(object).forEach((item) => {
      if (item !== key) {
        newObject[item] = object[item]
      }
    })
    return newObject
  }

  const addKeyToObject = (key, value, object): SingleVideoState => {
    const newObject = object
    newObject[key] = value
    return newObject
  }

  const resetKeyOrder = (key, value, object): SingleVideoState => {
    const oldObject = removeKeyFromObject(key, object)
    return addKeyToObject(key, value, oldObject)
  }

  // Disallow more than one video to be played at a time
  // used to stop videos from playing if they are too close vertically
  // Or if the user manually plays a video from a different post manually
  // Also syncs volume and muted status when played

  const onVideoPlay = (identifier, paused: boolean, target): void => {
    if (!paused) {
      setPlaying(x => resetKeyOrder(identifier, target, x))
      if (target.volume !== volume) {
        target.volume = volume
      }
      if (target.muted !== muted) {
        target.muted = muted
      }
    }

    if (paused && playing[identifier].paused) {
      setPlaying(x => removeKeyFromObject(identifier, x))
    }
  }

  useEffect(() => {
    if (Object.keys(playing).length > 1) {
      Object.keys(playing).slice(0, -1).forEach((item) => playing[item].pause())
    }
  }, [playing])

   */

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
