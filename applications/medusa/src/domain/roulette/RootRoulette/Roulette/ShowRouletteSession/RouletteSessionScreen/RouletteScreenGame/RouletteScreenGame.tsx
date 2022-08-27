import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenGameFragment$key } from '@//:artifacts/RouletteScreenGameFragment.graphql'
import type { RouletteScreenGameViewerFragment$key } from '@//:artifacts/RouletteScreenGameViewerFragment.graphql'
import { graphql } from 'react-relay'
import { GridItem } from '@chakra-ui/react'
import RouletteScreenShuffle from './RouletteScreenShuffle/RouletteScreenShuffle'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: RouletteScreenGameFragment$key
  viewerQuery: RouletteScreenGameViewerFragment$key | null
}

const Fragment = graphql`
  fragment RouletteScreenGameFragment on RouletteStatus {
    gameSession {
      isClosed
    }
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

  const {
    state
  } = useSequenceContext()

  // TODO game lost popup
  // TODO viewerIsPlayer is false, encouraging you to spin to play your own game

  const showGameFinished = state.isPending === false && state.isSpinning === false && data.gameSession.isClosed

  return (
    <GridItem overflow='hidden'>
      <RouletteScreenShuffle query={data} viewerQuery={viewerData} />
    </GridItem>
  )
}
