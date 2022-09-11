import { Box } from '@chakra-ui/react'
import { Icon } from '../../../../../../PageLayout'
import { ControlPlayButton } from '@//:assets/icons'
import { useEffect, useState } from 'react'

interface Props {
  player: any
}

export default function VideoSpinner (props: Props): JSX.Element {
  const {
    player: inheritedPlayer
  } = props

  const [player, setPlayer] = useState(inheritedPlayer)

  const [hasStarted, setHasStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // TODO this component only handles starting the video and then unmounts
  // TODO loading is at the top left of the video so you can still see the content while the video loads

  const onStart = (): void => {
    player.start()
  }

  useEffect(() => {
    if (player == null) return

    const onAnyEvent = (player): void => {
      setPlayer(player)
    }
    player.on('play', onAnyEvent)

    return () => {
      player.off('play', onAnyEvent)
    }
  }, [player])

  if (!(player.hasStart)) {
    return (
      <Box onClick={onStart} cursor='pointer' w={16} h={16}>
        <Icon icon={ControlPlayButton} fill='whiteAlpha.800' />
      </Box>
    )
  }

  return (
    <></>
  )
}
