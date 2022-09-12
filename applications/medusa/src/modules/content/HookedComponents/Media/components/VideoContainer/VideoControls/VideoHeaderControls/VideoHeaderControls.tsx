import { Fade, Flex } from '@chakra-ui/react'
import VideoLoading from './VideoLoading/VideoLoading'
import { VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import { VideoControlsOpen } from '../VideoControls'

interface Props extends VideoControlTypeProps, VideoControlsOpen {
  player: PlayerType
}

export default function VideoHeaderControls (props: Props): JSX.Element {
  const {
    player,
    duration,
    hasAudio,
    isOpen
  } = props

  return (
    <Flex align='flex-start' w='100%' h='100%' p={2}>
      <Fade
        style={{
          width: '100%',
          height: '100%'
        }}
        in={isOpen}
      >
        <VideoLoading hasAudio={hasAudio} duration={duration} player={player} />
      </Fade>
    </Flex>
  )
}
