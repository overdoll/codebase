import { useEffect } from 'react'
import { PlayerType } from '../types'

export default function syncPlayerLoading (player: PlayerType | null, setLoading?: (loading: boolean) => void): void {
  useEffect(() => {
    if (player == null) return

    const onCanPlay = (): void => {
      setLoading?.(false)
    }

    const onWaiting = (): void => {
      setLoading?.(true)
    }

    player.on('canplay', onCanPlay)
    player.on('waiting', onWaiting)
    return () => {
      player.off('canplay', onCanPlay)
      player.off('waiting', onWaiting)
    }
  }, [player, setLoading])
}
