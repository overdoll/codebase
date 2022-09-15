import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultRouletteQuery } from '@//:artifacts/ResultRouletteQuery.graphql'
import { graphql } from 'react-relay'
import MetaRoulette from './MetaRoulette/MetaRoulette'

interface Props {
  query: PreloadedQuery<ResultRouletteQuery>
}

const Query = graphql`
  query ResultRouletteQuery($reference: String!) @preloadable {
    gameSessionStatus(reference: $reference) {
      ...MetaRouletteFragment
    }
    viewer {
      ...MetaRouletteViewerFragment
    }
  }
`

export default function ResultRoulette (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultRouletteQuery>(
    Query,
    query
  )

  return (
    <MetaRoulette gameSessionStatusQuery={queryData?.gameSessionStatus} viewerQuery={queryData.viewer} />
  )
}
