import { Flex, Grid, GridItem } from '@chakra-ui/react'
import VideoCenterControls from './VideoCenterControls/VideoCenterControls'

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
        <GridItem bg='purple.400' opacity={0.3} area='header' />
        <GridItem area='center'>
          <VideoCenterControls player={player} />
        </GridItem>
        <GridItem bg='teal.400' opacity={0.3} area='footer' />
        <GridItem bg='orange.400' opacity={0.3} area='left' />
        <GridItem bg='green.400' opacity={0.3} area='right' />
      </Grid>
    </Flex>
  )
}
