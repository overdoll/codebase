import { useCallback, useState } from 'react'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'

interface UseVideoStorageManagerReturn {
  volume: number
  muted: boolean
  updateVolume: (volume: number) => void
  updateMuted: (muted: boolean) => void
}

export default function useVideoStorageManager (): UseVideoStorageManagerReturn {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage('globalVideoVolume', 0.1)
  const [globalVideoMuted, setGlobalVideoMuted] = useSessionStorage('globalVideoMuted', true)

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

  return {
    volume,
    muted,
    updateVolume: (volume) => onChangeVolume(volume),
    updateMuted: (muted) => onChangeMuted(muted)
  }
}
