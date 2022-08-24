import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenClosedFragment$key } from '@//:artifacts/RouletteScreenClosedFragment.graphql'
import { graphql } from 'react-relay'
import RouletteScreenBackground from '../../../RouletteScreenBackground/RouletteScreenBackground'

interface Props {
  query: RouletteScreenClosedFragment$key
}

const Fragment = graphql`
  fragment RouletteScreenClosedFragment on RouletteStatus {
    gameState {
      post {
        __typename
      }
    }
  }
`

export default function RouletteScreenClosed (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    (
      <RouletteScreenBackground>
        game finished
      </RouletteScreenBackground>
    )
  )
}
