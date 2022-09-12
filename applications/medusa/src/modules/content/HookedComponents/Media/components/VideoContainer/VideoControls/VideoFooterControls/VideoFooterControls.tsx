import { Flex, HStack } from '@chakra-ui/react'
import VideoPlayPause from './VideoPlayPause/VideoPlayPause'
import { ContainerRefProps, VideoControlTypeProps } from '../../VideoContainer'
import { useEffect, useState } from 'react'
import VideoFullscreen from './VideoFullscreen/VideoFullscreen'
import VideoSimpleUnmute from './VideoSimpleUnmute/VideoSimpleUnmute'

interface Props extends Pick<VideoControlTypeProps, 'hasAudio'>, ContainerRefProps {
  player: any
}

export default function VideoFooterControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    containerRef
  } = props

  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onPlay = (): void => {
      setHasStarted(true)
    }

    player.on('canplay', onPlay)
    return () => {
      player.off('canplay', onPlay)
    }
  }, [player])

  if (!hasStarted) {
    return <></>
  }

  return (
    <Flex p={2} align='flex-end' justify='center' w='100%' h='100%'>
      <HStack h={12} bg='dimmers.300' borderRadius='full' px={4} align='center' justify='center' spacing={4}>
        <VideoPlayPause player={player} />
        <VideoSimpleUnmute hasAudio={hasAudio} player={player} />
        <VideoFullscreen containerRef={containerRef} player={player} />
      </HStack>
    </Flex>
  )
}
