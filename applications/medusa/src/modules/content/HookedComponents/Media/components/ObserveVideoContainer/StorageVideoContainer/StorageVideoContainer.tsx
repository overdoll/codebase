import { useEffect, useState } from 'react'
import { OnPlayerInitType, PlayerType } from '../../../types'
import useVideoStorageManager from '../../../support/useVideoStorageManager'
import VideoContainer, { VideoContainerProps } from '../../VideoContainer/VideoContainer'
import syncPlayerVolumeChange from '../../../support/syncPlayerVolumeChange'

interface Props extends Omit<VideoContainerProps, 'volume' | 'muted'> {
  onPlayerInit?: OnPlayerInitType
}

export default function StorageVideoContainer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    ...rest
  } = props

  const [player, setPlayer] = useState<PlayerType | null>(null)

  const {
    volume,
    muted,
    updateVolume,
    updateMuted
  } = useVideoStorageManager()

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  // when volume has been changed by other video players, we update this value when video is played
  useEffect(() => {
    if (player == null) return
    const onPlay = (): void => {
      player.volume = volume
    }
    player.once('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [volume, player])

  // same as above but for muted property
  useEffect(() => {
    if (player == null) return
    const onPlay = (): void => {
      player.muted = muted
    }
    player.once('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [muted, player])

  syncPlayerVolumeChange(player, updateVolume, updateMuted, setPlayer)

  return (
    <VideoContainer
      onPlayerInit={setPlayers}
      volume={volume}
      muted={muted}
      {...rest}
    />
  )
}