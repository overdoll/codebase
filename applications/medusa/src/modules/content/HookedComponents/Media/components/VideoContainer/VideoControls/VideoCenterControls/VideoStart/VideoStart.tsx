import { ArrowButtonRefresh, ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { startOrPlayVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaButton/MediaButton'

interface Props {
  player: any
}

export default function VideoStart (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

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
      w={16}
      h={16}
      onClick={() => startOrPlayVideo(player)}
      icon={hasError ? ArrowButtonRefresh : ControlPlayButton}
    />
  )
}
