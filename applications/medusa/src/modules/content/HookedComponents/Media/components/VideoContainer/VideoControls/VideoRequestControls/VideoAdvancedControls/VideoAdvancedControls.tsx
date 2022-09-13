import { Fade, Flex, GridItem } from '@chakra-ui/react'
import { ContainerRefProps, VideoControlTypeProps } from '../../../VideoContainer'
import { PlayerType } from '../../../../../types'
import VideoAdvancedFooterControls from './VideoAdvancedFooterControls/VideoAdvancedFooterControls'
import { VideoControlsOpen } from '../../VideoControls'

interface Props extends VideoControlTypeProps, ContainerRefProps, VideoControlsOpen {
  player: PlayerType
}

export default function VideoAdvancedControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    duration,
    containerRef,
    isOpen
  } = props

  return (
    <>
      <GridItem
        area='footer'
      >
        <Flex
          p={2}
          align='flex-end'
          justify='flex-end'
          w='100%'
          h='100%'
        >
          <Fade
            in={isOpen}
            style={{
              pointerEvents: isOpen ? 'auto' : 'none'
            }}
          >
            <VideoAdvancedFooterControls
              isOpen={isOpen}
              player={player}
              hasAudio={hasAudio}
              containerRef={containerRef}
              duration={duration}
            />
          </Fade>
        </Flex>
      </GridItem>
      {/* <GridItem area='left' /> */}
      {/* <GridItem area='right' /> */}
    </>
  )
}
