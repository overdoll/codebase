import { Flex, HStack } from '@chakra-ui/react'
import VideoPlayPause from './VideoPlayPause/VideoPlayPause'

interface Props {
  player: any
}

export default function VideoFooterControls (props: Props): JSX.Element {
  const {
    player
  } = props

  return (
    <Flex justify='center' w='100%' h='100%' pb={4}>
      <HStack align='flex-end' spacing={2}>
        <VideoPlayPause player={player} />
      </HStack>
    </Flex>
  )
}
