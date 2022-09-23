import { ContainerRefProps, VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { VideoControlsOpen } from '../VideoControls'

const Simple = dynamic(
  async () => {
    return await import('./VideoSimpleControls/VideoSimpleControls')
  }
)

const Advanced = dynamic(
  async () => {
    return await import('./VideoAdvancedControls/VideoAdvancedControls')
  }
)

export interface ControlTypes {
  controls: 'simple' | 'advanced' | 'none'
}

interface Props extends VideoControlTypeProps, ContainerRefProps, ControlTypes, VideoControlsOpen {
  player: PlayerType
}

export default function VideoRequestControls (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    hasAudio,
    duration,
    containerRef,
    controls,
    isOpen
  } = props

  const [hasStarted, setHasStarted] = useState(false)
  const [player, setPlayer] = useState<PlayerType>(inheritedPlayer)

  useEffect(() => {
    if (player == null) return

    const onPlay = (player): void => {
      setHasStarted(true)
      setPlayer(player)
    }

    player.on('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [player])

  if (!hasStarted) {
    return <></>
  }

  if (controls === 'simple') {
    return (
      <Simple
        isOpen={isOpen}
        player={player}
        duration={duration}
        hasAudio={hasAudio}
      />
    )
  }

  if (controls === 'advanced') {
    return (
      <Advanced
        isOpen={isOpen}
        player={player}
        hasAudio={hasAudio}
        duration={duration}
        containerRef={containerRef}
      />
    )
  }

  return <></>
}
