import { useFragment } from 'react-relay/hooks'
import type { RouletteSessionScreenFragment$key } from '@//:artifacts/RouletteSessionScreenFragment.graphql'
import { graphql } from 'react-relay'
import RouletteScreenInstructions from './RouletteScreenInstructions/RouletteScreenInstructions'
import RouletteScreenGame from './RouletteScreenGame/RouletteScreenGame'

interface Props {
  query: RouletteSessionScreenFragment$key | null
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

export default function RouletteSessionScreen (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  if (data?.gameState == null) {
    return <RouletteScreenInstructions />
  }

  return <RouletteScreenGame query={data} />
}
