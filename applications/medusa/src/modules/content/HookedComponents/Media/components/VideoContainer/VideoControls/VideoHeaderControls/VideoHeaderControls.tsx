import { Flex } from '@chakra-ui/react'
import VideoLoading from './VideoLoading/VideoLoading'
import { VideoControlTypeProps } from '../../VideoContainer'

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  player: any
}

export default function VideoHeaderControls (props: Props): JSX.Element {
  const {
    player,
    duration
  } = props

  return (
    <Flex align='flex-start' w='100%' h='100%' p={2}>
      <VideoLoading duration={duration} player={player} />
    </Flex>
  )
}
