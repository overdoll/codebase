import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { ContainerRefProps, VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import useEnterControls from '../../../../support/useEnterControls'
import { useRef, useState } from 'react'
import VideoHeaderControls from '../VideoHeaderControls/VideoHeaderControls'
import VideoRequestControls from '../VideoRequestControls/VideoRequestControls'
import VideoCenterControls from '../VideoCenterControls/VideoCenterControls'
import syncPlayerPlayPause from '../../../../support/syncPlayerPlayPause'

interface Props extends VideoControlTypeProps, ContainerRefProps {
  player: PlayerType
}

export default function VideoControlsOverlay (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    hasAudio,
    duration,
    containerRef
  } = props

  const ref = useRef(null)
  const [player, setPlayer] = useState<PlayerType>(inheritedPlayer)
  const [playing, setPlaying] = useState(((player?.video?.paused) === false) ?? false)

  syncPlayerPlayPause(player, setPlaying, setPlayer)

  const { isOpen } = useEnterControls({
    ref
  })

  return (
    <Flex
      ref={ref}
      w='100%'
      h='100%'
      top={0}
      right={0}
      left={0}
      cursor={isOpen ? 'auto' : 'none'}
      position='absolute'
      align='center'
      justify='center'
      userSelect='none'
    >
      <Grid
        w='100%'
        h='100%'
        templateAreas={`
      "header header header"
      "left center right"
      "footer footer footer"  
      `}
        templateRows='25% 50% 25%'
        templateColumns='25% 50% 25%'
      >
        <GridItem area='header'>
          <VideoHeaderControls
            isOpen={playing ? isOpen : true}
            hasAudio={hasAudio}
            duration={duration}
            player={player}
          />
        </GridItem>
        <GridItem area='center'>
          <VideoCenterControls
            player={player}
          />
        </GridItem>
        <VideoRequestControls
          isOpen={isOpen}
          controls='advanced'
          duration={duration}
          containerRef={containerRef}
          hasAudio={hasAudio}
          player={player}
        />
      </Grid>
    </Flex>
  )
}
