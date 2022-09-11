import { Box } from '@chakra-ui/react'
import { Icon } from '../../../../../../../PageLayout'
import { ControlPauseButton, ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'
import { pauseVideo, playVideo } from '../../../../../support/controls'

interface Props {
  player: any
}

export default function VideoPlayPause (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [hasStarted, setHasStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onPlay = (player): void => {
      setPlayer(player)
      setHasStarted(true)
      setPlaying(true)
    }

    const onPause = (player): void => {
      setPlayer(player)
      setPlaying(false)
    }

    player.on('play', onPlay)
    player.on('pause', onPause)
    return () => {
      player.off('play', onPlay)
      player.on('pause', onPause)
    }
  }, [player, setPlayer])

  if (!hasStarted) {
    return <></>
  }

  if (playing) {
    return (
      <Box
        onClick={() => pauseVideo(player)}
        cursor='pointer'
        w={8}
        h={8}
      >
        <Icon icon={ControlPauseButton} fill='whiteAlpha.900' />
      </Box>
    )
  }

  return (
    <Box
      onClick={() => playVideo(player)}
      cursor='pointer'
      w={8}
      h={8}
    >
      <Icon icon={ControlPlayButton} fill='whiteAlpha.900' />
    </Box>
  )
}
