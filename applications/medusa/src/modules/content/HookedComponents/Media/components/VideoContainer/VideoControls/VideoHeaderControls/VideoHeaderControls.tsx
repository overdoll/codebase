import { Flex } from '@chakra-ui/react'
import VideoLoading from './VideoLoading/VideoLoading'

interface Props {
  player: any
}

export default function VideoHeaderControls (props: Props): JSX.Element {
  const {
    player
  } = props

  return (
    <Flex align='flex-start' w='100%' h='100%' p={2}>
      <VideoLoading player={player} />
    </Flex>
  )
}
