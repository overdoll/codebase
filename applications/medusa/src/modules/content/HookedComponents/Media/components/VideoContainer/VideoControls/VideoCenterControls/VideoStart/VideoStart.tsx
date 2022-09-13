import { ArrowButtonRefresh, ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { startOrPlayVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaControls/MediaButton/MediaButton'
import { PlayerType } from '../../../../../types'

interface Props {
  player: PlayerType
}

export default function VideoStart (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState<PlayerType>(inheritedPlayer)

  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setError] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onPlay = (): void => {
      setHasStarted(true)
      setError(false)
    }

    const onError = (): void => {
      setError(true)
    }

    player.once('play', onPlay)
    player.on('error', onError)
    return () => {
      player.off('play', onPlay)
      player.off('error', onError)
    }
  }, [player, setPlayer])

  if (hasStarted && !hasError) {
    return <></>
  }

  return (
    <MediaButton
      w={20}
      h={20}
      onClick={(e) => {
        e.stopPropagation()
        startOrPlayVideo(player)
      }}
      iconProps={{
        dropShadow: '2xl'
      }}
      icon={hasError ? ArrowButtonRefresh : ControlPlayButton}
    />
  )
}
