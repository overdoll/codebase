import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

interface Context {
  videoVolume: number
  videoMuted: boolean
  changeVideoVolume: (e) => void
  changeVideoMuted: (e) => void
  onVideoPlay: (identifier, paused, target) => void
  handleOnscreenVideos: (identifier, videos) => void
  handleOffscreenVideos: (identifier, videos) => void
}

interface VideoState {
  [identifier: string]: HTMLVideoElement[]
}

interface SingleVideoState {
  [identifier: string]: HTMLVideoElement
}

const defaultValue = {
  videoVolume: 0.1,
  videoMuted: true,
  changeVideoVolume: (e) => {
  },
  changeVideoMuted: (e) => {
  },
  handleOnscreenVideos: (identifier, videos) => {
  },
  handleOffscreenVideos: (identifier, videos) => {
  },
  onVideoPlay: (identifier, paused, target) => {
  }
}

export const GlobalVideoManagerContext = createContext<Context>(defaultValue)

export function GlobalVideoManagerProvider ({ children }: Props): JSX.Element {
  // TODO add local storage access here for video volume

  const [volume, setVolume] = useState(defaultValue.videoVolume)

  const [muted, setMuted] = useState(defaultValue.videoMuted)

  const [onScreen, setOnscreen] = useState<VideoState>({})
  const [offScreen, setOffscreen] = useState<VideoState>({})
  const [playing, setPlaying] = useState<SingleVideoState>({})

  const onChangeMuted = useCallback((isMuted) => {
    setMuted(isMuted)
  }, [])

  const onChangeVolume = useCallback((volume) => {
    setVolume(volume)
    // TODO update local storage value here
  }, [])

  const removeKeyFromObject = (key, object): VideoState => {
    const newObject = {}
    Object.keys(object).forEach((item) => {
      if (item !== key) {
        newObject[item] = object[item]
      }
    })
    return newObject
  }

  const addKeyToObject = (key, value, object): VideoState | SingleVideoState => {
    const newObject = object
    newObject[key] = value
    return newObject
  }

  const handleOnscreenVideos = (identifier, videos): void => {
    if (videos.length < 1) return
    setOnscreen(x => {
      const object = x
      object[identifier] = videos
      return object
    })

    setOffscreen(x => {
      return removeKeyFromObject(identifier, x)
    })
  }

  const handleOffscreenVideos = (identifier, videos): void => {
    if (videos.length < 1) return
    setOffscreen(x => {
      const object = x
      object[identifier] = videos
      return object
    })
    setOnscreen(x => {
      return removeKeyFromObject(identifier, x)
    })
  }

  useEffect(() => {
    // We filter out the current post from changes because
    // It will be handled by the post manager
    const filterKeys = Object.keys(onScreen).slice(0, -1)
    filterKeys.forEach((item) => {
      onScreen[item].forEach((innerItem) => {
        if (innerItem.muted !== muted) {
          innerItem.muted = muted
        }
      })
    })
  }, [onScreen, muted])

  useEffect(() => {
    Object.keys(onScreen).forEach((item) => {
      onScreen[item].forEach((innerItem) => {
        if (innerItem.muted !== muted) {
          innerItem.muted = muted
        }
      })
    })
  }, [offScreen, muted])

  // Disallow more than one video to be played at a time
  // used to stop videos from playing if they are too close vertically
  // Or if the user manually plays a video from a different post manually

  const onVideoPlay = (identifier, paused: boolean, target): void => {
    if (!paused) {
      setPlaying(x => addKeyToObject(identifier, target, x))
    }
    if (paused) {
      setPlaying(x => removeKeyFromObject(identifier, x)
      )
    }
  }

  useEffect(() => {
    console.log(playing)
    if (Object.keys(playing).length > 1) {
      Object.keys(playing).slice(1).forEach((item) => playing[item].pause())
    }
  }, [playing])

  const contextValue = {
    videoVolume: volume,
    videoMuted: muted,
    changeVideoVolume: (volume) => onChangeVolume(volume),
    changeVideoMuted: (volume) => onChangeMuted(volume),
    handleOnscreenVideos: (identifier, videos) => handleOnscreenVideos(identifier, videos),
    handleOffscreenVideos: (identifier, videos) => handleOffscreenVideos(identifier, videos),
    onVideoPlay: (identifier, paused, target) => onVideoPlay(identifier, paused, target)
  }

  return (
    <GlobalVideoManagerContext.Provider value={contextValue}>
      {children}
    </GlobalVideoManagerContext.Provider>
  )
}
