import { useEffect } from 'react'
import { OnPlayerInitType, PlayerType } from '../types'

export default function syncPlayerPlayPause (player: PlayerType, setPlaying?: (playing) => void, setPlayer?: OnPlayerInitType): void {
  useEffect(() => {
    if (player == null) return

    const onPlay: OnPlayerInitType = (player) => {
      setPlaying?.(true)
      setPlayer?.(player)
    }

    const onPause: OnPlayerInitType = (player) => {
      setPlaying?.(false)
      setPlayer?.(player)
    }

    player.on('play', onPlay)
    player.on('pause', onPause)
    return () => {
      player.on('play', onPlay)
      player.on('pause', onPause)
    }
  }, [player, setPlaying])
}
