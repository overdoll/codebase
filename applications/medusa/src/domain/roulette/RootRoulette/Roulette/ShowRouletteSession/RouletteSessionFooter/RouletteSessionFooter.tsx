import { useFragment } from 'react-relay/hooks'
import type { RouletteSessionFooterFragment$key } from '@//:artifacts/RouletteSessionFooterFragment.graphql'
import { graphql } from 'react-relay'
import SpinRoulette from './SpinRoulette/SpinRoulette'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import RouletteScreenDice from './RouletteScreenDice/RouletteScreenDice'
import DiceTable from './DiceTable/DiceTable'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

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

  const {
    state
  } = useSequenceContext()

  const showGameFinished = state.isPending === false && state.isSpinning === false && data.gameSession.isClosed

  return (
    <Grid
      templateColumns={{
        base: '1fr 110px',
        md: '1fr 170px'
      }}
      templateRows='minmax(0, 1fr)'
      h='100%'
      w='100%'
    >
      <GridItem>
        <DiceTable>
          <RouletteScreenDice query={data.gameState} />
          {(showGameFinished) && (
            <>game finished</>
          )}
        </DiceTable>
      </GridItem>
      <GridItem>
        <Flex w='100%' h='100%' align='flex-start' justify='flex-end'>
          <SpinRoulette query={data} />
        </Flex>
      </GridItem>
    </Grid>
  )
}
