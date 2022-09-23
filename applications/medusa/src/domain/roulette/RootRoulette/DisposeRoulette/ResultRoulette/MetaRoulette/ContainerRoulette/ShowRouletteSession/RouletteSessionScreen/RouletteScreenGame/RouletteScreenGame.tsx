import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenGameFragment$key } from '@//:artifacts/RouletteScreenGameFragment.graphql'
import { graphql } from 'react-relay'
import { Box, GridItem } from '@chakra-ui/react'
import RouletteScreenShuffle from './RouletteScreenShuffle/RouletteScreenShuffle'
import RouletteScreenClosed from '../RouletteScreenClosed/RouletteScreenClosed'

interface Props {
  query: RouletteScreenGameFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenGameFragment on RouletteStatus {
    gameState {
      __typename
    }
    ...RouletteScreenClosedFragment
    ...RouletteScreenShuffleFragment
  }
`

export default function RouletteScreenGame (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  return (
    <GridItem overflow='hidden'>
      <Box minWidth={0} data-test-id='roulette-post' w='100%' h='100%' position='relative'>
        {data.gameState != null && <RouletteScreenClosed query={data} />}
        <RouletteScreenShuffle query={data} />
      </Box>
    </GridItem>
  )
}
