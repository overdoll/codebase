import { useEffect, useState } from 'react'
import { OnPlayerInitType, PlayerType } from '../../../types'
import useVideoStorageManager from '../../../support/useVideoStorageManager'
import VideoContainer, { VideoContainerProps } from '../../VideoContainer/VideoContainer'
import syncPlayerVolumeChange from '../../../support/syncPlayerVolumeChange'
import useSniffer from '../../../../../../hooks/useSniffer'

export interface StorageVideoProps extends Omit<VideoContainerProps, 'volume' | 'muted'> {
  onPlayerInit?: OnPlayerInitType
}

interface Props {
  videoProps: StorageVideoProps
  storageProps: {
    isObserving: boolean
  }
}

export default function StorageVideoContainer (props: Props): JSX.Element {
  const {
    videoProps,
    storageProps
  } = props

  const { isObserving } = storageProps

  const {
    onPlayerInit,
    ...restVideo
  } = videoProps

  const [player, setPlayer] = useState<PlayerType | null>(null)

  const { device } = useSniffer()

  const {
    volume,
    muted,
    updateMuted,
    updateVolume
  } = useVideoStorageManager(device)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  const setVolume = (volume: number): void => {
    if (device !== 'mobile') {
      updateVolume(volume)
    }
  }

  // when volume has been changed by other video players, we update this value when video is played
  useEffect(() => {
    if (player == null || !isObserving || device === 'mobile') return
    const onPlay = (): void => {
      player.video.volume = volume
    }
    player.on('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [volume, player, isObserving])

  // same as above but for muted property
  useEffect(() => {
    if (player == null || !isObserving || device === 'mobile') return
    const onPlay = (): void => {
      player.video.muted = muted
    }
    player.on('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [muted, player, isObserving])

  syncPlayerVolumeChange(player, setVolume, updateMuted, setPlayer)

  return (
    <VideoContainer
      onPlayerInit={setPlayers}
      volume={volume}
      muted={muted}
      {...restVideo}
    />
  )
}
