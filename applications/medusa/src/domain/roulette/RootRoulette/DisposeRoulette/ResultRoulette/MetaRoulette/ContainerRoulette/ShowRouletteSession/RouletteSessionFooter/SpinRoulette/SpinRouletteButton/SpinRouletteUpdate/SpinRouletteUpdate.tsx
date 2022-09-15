import { useLazyLoadQuery } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { SpinRouletteUpdateQuery } from '@//:artifacts/SpinRouletteUpdateQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'

interface Props extends ComponentSearchArguments<any> {
}

const GameQuery = graphql`
  query SpinRouletteUpdateQuery($reference: String!) {
    gameSessionStatus(reference: $reference) {
      __typename
      ...on RouletteStatus {
        gameSession {
          id
          reference
          isClosed
        }
        score
        totalDoubles
        totalRolls
      }
    }
  }
`

export default function SpinRouletteUpdate (props: Props): JSX.Element {
  const { searchArguments } = props

  useLazyLoadQuery<SpinRouletteUpdateQuery>(
    GameQuery,
    searchArguments.variables,
    searchArguments.options
  )

  return (
    <></>
  )
}
