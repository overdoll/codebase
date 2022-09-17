import { useLocalStorage, useSessionStorage } from 'usehooks-ts'

interface UseVideoStorageManagerReturn {
  volume: number
  muted: boolean
  updateVolume: (volume: number) => void
  updateMuted: (muted: boolean) => void
}

export default function useVideoStorageManager (): UseVideoStorageManagerReturn {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage<number>('globalVideoVolume', 0.1)
  const [globalVideoMuted, setGlobalVideoMuted] = useSessionStorage('globalVideoMuted', true)

  const onChangeMuted = (muted: boolean): void => {
    setGlobalVideoMuted(muted)
  }

  const onChangeVolume = (volume: number): void => {
    setGlobalVideoVolume(volume)
  }

  return {
    volume: globalVideoVolume,
    muted: globalVideoMuted,
    updateVolume: (volume) => onChangeVolume(volume),
    updateMuted: (muted) => onChangeMuted(muted)
  }
}
