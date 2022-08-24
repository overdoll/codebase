import { useFragment } from 'react-relay/hooks'
import type { RouletteSessionFooterFragment$key } from '@//:artifacts/RouletteSessionFooterFragment.graphql'
import { graphql } from 'react-relay'
import SpinRoulette from './SpinRoulette/SpinRoulette'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import RouletteScreenDice from '../RouletteSessionScreen/RouletteScreenGame/RouletteScreenDice/RouletteScreenDice'

interface Props {
  query: RouletteSessionFooterFragment$key
}

const Fragment = graphql`
  fragment RouletteSessionFooterFragment on RouletteStatus {
    gameState {
      ...RouletteScreenDiceFragment
    }
    gameSession {
      isClosed
    }
    ...SpinRouletteFragment
  }
`

export default function RouletteSessionFooter (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <Grid
      templateColumns={{
        base: '1fr 130px',
        md: '1fr 200px'
      }}
      templateRows='1fr'
      h='100%'
      w='100%'
    >
      <GridItem bg='orange.400'>
        {data.gameState != null && (
          <Flex w='100%'>
            <RouletteScreenDice query={data.gameState} />
            {data.gameSession.isClosed && (
              <>game finished</>
            )}
          </Flex>
        )}
      </GridItem>
      <GridItem bg='primary.400'>
        <SpinRoulette query={data} />
      </GridItem>
    </Grid>
  )
}
