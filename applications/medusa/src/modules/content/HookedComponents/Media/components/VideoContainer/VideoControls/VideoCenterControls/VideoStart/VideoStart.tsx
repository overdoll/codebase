import { Box } from '@chakra-ui/react'
import { Icon } from '../../../../../../../PageLayout'
import { ArrowButtonRefresh, ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { startOrPlayVideo } from '../../../../../support/controls'

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
    <Box
      onClick={() => startOrPlayVideo(player)}
      cursor='pointer'
      w={16}
      h={16}
    >
      {hasError
        ? (
          <Icon icon={ArrowButtonRefresh} fill='whiteAlpha.900' />
          )
        : (
          <Icon icon={ControlPlayButton} fill='whiteAlpha.900' />
          )}
    </Box>
  )
}
