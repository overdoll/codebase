import { Flex, HStack } from '@chakra-ui/react'
import VideoPlayPause from './VideoPlayPause/VideoPlayPause'
import { VideoControlTypeProps } from '../../VideoContainer'
import { useEffect, useState } from 'react'
import VideoFullscreen from './VideoFullscreen/VideoFullscreen'

interface Props extends Pick<VideoControlTypeProps, 'hasAudio'> {
  player: any
}

export default function VideoFooterControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio
  } = props

  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onPlay = (player): void => {
      setHasStarted(true)
    }

    player.on('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [player])

  if (!hasStarted) {
    return <></>
  }

  return (
    <Flex justify='center' w='100%' h='100%' pb={4}>
      <HStack align='flex-end' spacing={4}>
        <VideoPlayPause player={player} />
        <VideoFullscreen player={player} />
      </HStack>
    </Flex>
  )
}
