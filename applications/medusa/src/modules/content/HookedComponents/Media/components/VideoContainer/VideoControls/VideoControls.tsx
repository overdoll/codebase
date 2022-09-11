import { Flex } from '@chakra-ui/react'
import VideoSpinner from './VideoSpinner/VideoSpinner'

interface Props {
  player: any | null
}

export default function VideoControls (props: Props): JSX.Element {
  const {
    player
  } = props

  if (player == null) {
    return (
      <></>
    )
  }

  return (
    <Flex
      w='100%'
      h='100%'
      top={0}
      right={0}
      left={0}
      position='absolute'
      align='center'
      justify='center'
    >
      <VideoSpinner player={player} />
    </Flex>
  )
}
