import { useEffect } from 'react'
import { OnPlayerInitType, PlayerType } from '../types'

export default function syncPlayerTimeUpdate (player: PlayerType | null, setTime?: (time) => void, setPlayer?: OnPlayerInitType): void {
  useEffect(() => {
    if (player == null) return

    const onTimeUpdate: OnPlayerInitType = (player) => {
      if (player.video == null) return
      setPlayer?.(player)
      setTime?.(player.currentTime)
    }

    player.on('timeupdate', onTimeUpdate)
    return () => {
      player.off('timeupdate', onTimeUpdate)
    }
  }, [player, setTime, setPlayer])
}
