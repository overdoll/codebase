import { useEffect } from 'react'
import { OnPlayerInitType, PlayerType } from '../types'

export default function syncPlayerVolumeChange (player: PlayerType | null, setVolume?: (volume) => void, setMuted?: (muted) => void, setPlayer?: OnPlayerInitType): void {
  useEffect(() => {
    if (player == null) return

    const onVolumeChange: OnPlayerInitType = (player) => {
      if (player.video == null) return
      setPlayer?.(player)
      setVolume?.(player.video.volume)
      setMuted?.(player.video.muted)
    }

    player.on('volumechange', onVolumeChange)
    return () => {
      player.off('volumechange', onVolumeChange)
    }
  }, [player, setVolume, setMuted, setPlayer])
}
