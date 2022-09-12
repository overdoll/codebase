import { Flex } from '@chakra-ui/react'
import VideoStart from './VideoStart/VideoStart'
import { PlayerType } from '../../../../types'

interface Props {
  player: PlayerType
}

export default function VideoCenterControls (props: Props): JSX.Element {
  const {
    player
  } = props

  return (
    <Flex w='100%' h='100%' align='center' justify='center'>
      <VideoStart player={player} />
    </Flex>
  )
}
