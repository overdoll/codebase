import { useFragment } from 'react-relay/hooks'
import type { RouletteSessionScreenFragment$key } from '@//:artifacts/RouletteSessionScreenFragment.graphql'
import type { RouletteSessionScreenViewerFragment$key } from '@//:artifacts/RouletteSessionScreenViewerFragment.graphql'
import { graphql } from 'react-relay'
import RouletteScreenInstructions from './RouletteScreenInstructions/RouletteScreenInstructions'
import RouletteScreenGame from './RouletteScreenGame/RouletteScreenGame'

interface Props {
  query: RouletteSessionScreenFragment$key
  viewerQuery: RouletteSessionScreenViewerFragment$key | null
}

const Fragment = graphql`
  fragment RouletteSessionScreenFragment on RouletteStatus {
    gameSession {
      id
      isClosed
      viewerIsPlayer
    }
    gameState {
      post {
        __typename
      }
    }
    ...RouletteScreenGameFragment
    ...RouletteScreenClosedFragment
  }
`

const ViewerFragment = graphql`
  fragment RouletteSessionScreenViewerFragment on Account {
    ...RouletteScreenGameViewerFragment
  }
`

export default function RouletteSessionScreen (props: Props): JSX.Element {
  const {
    query,
    viewerQuery
  } = props

  const data = useFragment(Fragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  // TODO eliminate unnecessary re-renders that sequence values cause, such as on the post

  if (data.gameState == null) {
    return <RouletteScreenInstructions />
  }

  return <RouletteScreenGame query={data} viewerQuery={viewerData} />
}
