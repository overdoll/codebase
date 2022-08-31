import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenGameFragment$key } from '@//:artifacts/RouletteScreenGameFragment.graphql'
import type { RouletteScreenGameViewerFragment$key } from '@//:artifacts/RouletteScreenGameViewerFragment.graphql'
import { graphql } from 'react-relay'
import { Flex, GridItem } from '@chakra-ui/react'
import RouletteScreenShuffle from './RouletteScreenShuffle/RouletteScreenShuffle'
import RouletteScreenClosed from '../RouletteScreenClosed/RouletteScreenClosed'

interface Props {
  query: RouletteScreenGameFragment$key
  viewerQuery: RouletteScreenGameViewerFragment$key | null
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

const ViewerFragment = graphql`
  fragment RouletteScreenGameViewerFragment on Account {
    ...RouletteScreenShuffleViewerFragment
  }
`

export default function RouletteScreenGame (props: Props): JSX.Element {
  const {
    query,
    viewerQuery
  } = props

  const data = useFragment(Fragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <GridItem overflow='hidden'>
      <Flex data-test-id='roulette-post' w='100%' h='100%' position='relative'>
        {data.gameState != null && <RouletteScreenClosed query={data} />}
        <RouletteScreenShuffle query={data} viewerQuery={viewerData} />
      </Flex>
    </GridItem>
  )
}
