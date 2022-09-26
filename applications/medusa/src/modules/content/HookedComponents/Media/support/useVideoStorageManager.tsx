import { useLocalStorage, useSessionStorage } from 'usehooks-ts'
import { UseSnifferReturn } from '../../../../hooks/useSniffer'

interface UseVideoStorageManagerReturn {
  volume: number
  muted: boolean
  updateVolume: (volume: number) => void
  updateMuted: (muted: boolean) => void
}

export default function useVideoStorageManager (device: UseSnifferReturn['device']): UseVideoStorageManagerReturn {
  const [globalVideoVolume, setGlobalVideoVolume] = useLocalStorage<number>('globalVideoVolume', 0.1)
  const [globalVideoMuted, setGlobalVideoMuted] = useSessionStorage('globalVideoMuted', true)

  const onChangeMuted = (muted: boolean): void => {
    if (muted === globalVideoMuted) return
    setGlobalVideoMuted(muted)
  }

  const onChangeVolume = (volume: number): void => {
    if (volume === globalVideoVolume) return
    setGlobalVideoVolume(volume)
  }

  return {
    volume: device === 'mobile' ? 1 : globalVideoVolume,
    muted: device === 'mobile' ? true : globalVideoMuted,
    updateVolume: (volume) => onChangeVolume(volume),
    updateMuted: (muted) => onChangeMuted(muted)
  }
}
