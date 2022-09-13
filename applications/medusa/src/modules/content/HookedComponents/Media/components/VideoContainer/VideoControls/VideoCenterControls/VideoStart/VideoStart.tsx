import { ArrowButtonRefresh, ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { startOrPlayVideo } from '../../../../../support/controls'
import MediaButton from '../../../../MediaControls/MediaButton/MediaButton'
import { PlayerType } from '../../../../../types'
import { Flex } from '@chakra-ui/react'
import { CONTROLS_CONTAINER } from '../../../../../constants'

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
    <Flex {...CONTROLS_CONTAINER} align='center' justify='center' py={4} px={8}>
      <MediaButton
        w={10}
        h={10}
        onClick={(e) => {
          e.stopPropagation()
          startOrPlayVideo(player)
        }}
        icon={hasError ? ArrowButtonRefresh : ControlPlayButton}
      />
    </Flex>
  )
}
