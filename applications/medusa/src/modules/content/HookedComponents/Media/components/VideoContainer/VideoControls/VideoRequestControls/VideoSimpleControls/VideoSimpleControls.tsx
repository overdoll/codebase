import { Fade, Flex, GridItem } from '@chakra-ui/react'
import { VideoControlTypeProps } from '../../../VideoContainer'
import { PlayerType } from '../../../../../types'
import VideoSimpleFooterControls from './VideoSimpleFooterControls/VideoSimpleFooterControls'
import { VideoControlsOpen } from '../../VideoControls'

interface Props extends VideoControlTypeProps, VideoControlsOpen {
  player: PlayerType
}

export default function VideoSimpleControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    duration,
    isOpen
  } = props

  return (
    <>
      <GridItem area='footer'>
        <Flex p={2} align='flex-end' justify='flex-end' w='100%' h='100%'>
          <Fade
            in={isOpen}
          >
            <VideoSimpleFooterControls duration={duration} hasAudio={hasAudio} player={player} />
          </Fade>
        </Flex>
      </GridItem>
    </>
  )
}
