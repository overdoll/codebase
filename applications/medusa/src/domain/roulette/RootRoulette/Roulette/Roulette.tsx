import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { RouletteQuery } from '@//:artifacts/RouletteQuery.graphql'
import { graphql } from 'react-relay'
import ShowRouletteSession from './ShowRouletteSession/ShowRouletteSession'
import CreateRouletteSession from './CreateRouletteSession/CreateRouletteSession'

interface Props {
  query: PreloadedQuery<RouletteQuery>
}

const Query = graphql`
  query RouletteQuery($reference: String!) @preloadable {
    gameSessionStatus(reference: $reference) {
      __typename
      ...on RouletteStatus {
        ...ShowRouletteSessionFragment
      }
    }
    viewer {
      ...ShowRouletteSessionViewerFragment
    }
  }
`

export default function Roulette (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<RouletteQuery>(
    Query,
    query
  )

  switch (queryData?.gameSessionStatus?.__typename) {
    case undefined:
      return <CreateRouletteSession />
    case 'RouletteStatus':
      return <ShowRouletteSession query={queryData.gameSessionStatus} viewerQuery={queryData.viewer} />
    default:
      return <></>
  }
}
