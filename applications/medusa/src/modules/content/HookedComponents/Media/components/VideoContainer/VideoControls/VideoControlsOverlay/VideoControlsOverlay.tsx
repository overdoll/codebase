import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { ContainerRefProps, VideoControlTypeProps } from '../../VideoContainer'
import { PlayerType } from '../../../../types'
import useEnterControls from '../../../../support/useEnterControls'
import { useEffect, useRef, useState } from 'react'
import VideoHeaderControls from '../VideoHeaderControls/VideoHeaderControls'
import VideoRequestControls, { ControlTypes } from '../VideoRequestControls/VideoRequestControls'
import VideoCenterControls from '../VideoCenterControls/VideoCenterControls'

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
  const [player] = useState<PlayerType>(inheritedPlayer)
  const [hasPlayed, setHasPlayed] = useState(false)

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
      cursor={showCursor === true ? 'auto' : 'none'}
      position='absolute'
      align='center'
      justify='center'
      maxW='container.md'
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
          <Flex align='flex-start' w='100%' h='100%' p={2}>
            {controls !== 'none' && (
              <VideoHeaderControls
                isOpen={isOpen}
                hasAudio={hasAudio}
                duration={duration}
                player={player}
              />
            )}
          </Flex>
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
