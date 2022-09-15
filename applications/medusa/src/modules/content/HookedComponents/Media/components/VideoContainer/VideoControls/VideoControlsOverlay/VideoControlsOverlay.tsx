import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { ContainerRefProps, VideoControlTypeProps, VideoWatchProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import useEnterControls from '../../../../support/useEnterControls'
import { useEffect, useRef, useState } from 'react'
import VideoHeaderControls from '../VideoHeaderControls/VideoHeaderControls'
import VideoRequestControls, { ControlTypes } from '../VideoRequestControls/VideoRequestControls'
import VideoCenterControls from '../VideoCenterControls/VideoCenterControls'
import syncPlayerPlayPause from '../../../../support/syncPlayerPlayPause'

interface Props extends VideoControlTypeProps, ContainerRefProps, ControlTypes {
  player: PlayerType
}

export default function VideoControlsOverlay (props: Props): JSX.Element {
  const {
    player: inheritedPlayer,
    hasAudio,
    duration,
    containerRef,
    controls
  } = props

  const ref = useRef(null)
  const [player, setPlayer] = useState<PlayerType>(inheritedPlayer)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [playing, setPlaying] = useState(((player?.video?.paused) === false) ?? false)

  useEffect(() => {
    if (player == null) return
    const onPlay = (): void => {
      setHasPlayed(true)
    }

    player.once('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [player])

  syncPlayerPlayPause(player, setPlaying, setPlayer)

  const {
    isOpen,
    showCursor
  } = useEnterControls({
    ref,
    isDisabled: !hasPlayed
  })

  return (
    <Flex
      ref={ref}
      w='100%'
      h='100%'
      top={0}
      right={0}
      left={0}
      cursor={showCursor === true ? 'auto' : 'none'}
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
          controls={controls}
          duration={duration}
          containerRef={containerRef}
          hasAudio={hasAudio}
          player={player}
        />
      </Grid>
    </Flex>
  )
}