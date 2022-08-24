import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenGameFragment$key } from '@//:artifacts/RouletteScreenGameFragment.graphql'
import type { RouletteScreenGameViewerFragment$key } from '@//:artifacts/RouletteScreenGameViewerFragment.graphql'
import { graphql } from 'react-relay'
import { GridItem } from '@chakra-ui/react'
import RouletteScreenPost from './RouletteScreenPost/RouletteScreenPost'

interface Props {
  query: RouletteScreenGameFragment$key
  viewerQuery: RouletteScreenGameViewerFragment$key | null
}

const Fragment = graphql`
  fragment RouletteScreenGameFragment on RouletteStatus {
    gameSession {
      isClosed
    }
    gameState @required(action: THROW) {
      id
      post {
        ...RouletteScreenPostFragment
      }
      ...RouletteScreenDiceFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment RouletteScreenGameViewerFragment on Account {
    ...RouletteScreenPostViewerFragment
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
    <GridItem overflow='hidden' bg='blackAlpha.700'>
      <RouletteScreenPost query={data.gameState.post} viewerQuery={viewerData} />
    </GridItem>
  )
}
