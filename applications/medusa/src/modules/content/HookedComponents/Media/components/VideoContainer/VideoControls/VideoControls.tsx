import { Flex, Grid, GridItem } from '@chakra-ui/react'
import VideoCenterControls from './VideoCenterControls/VideoCenterControls'
import VideoHeaderControls from './VideoHeaderControls/VideoHeaderControls'
import VideoFooterControls from './VideoFooterControls/VideoFooterControls'
import { VideoControlTypeProps } from '../VideoContainer'

interface Props extends VideoControlTypeProps {
  player: any | null
}

export default function VideoControls (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    duration
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
      <Grid
        w='100%'
        h='100%'
        templateAreas={`
      "header header header"
      "left center right"
      "footer footer footer"  
      `}
        templateRows='30% 40% 30%'
        templateColumns='30% 40% 30%'
      >
        <GridItem area='header'>
          <VideoHeaderControls
            duration={duration}
            player={player}
          />
        </GridItem>
        <GridItem area='center'>
          <VideoCenterControls
            player={player}
          />
        </GridItem>
        <GridItem area='footer'>
          <VideoFooterControls
            hasAudio={hasAudio}
            player={player}
          />
        </GridItem>
        <GridItem area='left' />
        <GridItem area='right' />
      </Grid>
    </Flex>
  )
}
