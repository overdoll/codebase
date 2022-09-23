import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultClubsFeedQuery } from '@//:artifacts/ResultClubsFeedQuery.graphql'
import { graphql } from 'react-relay'
import MetaClubsFeed from './MetaClubsFeed/MetaClubsFeed'

interface Props {
  query: PreloadedQuery<ResultClubsFeedQuery>
}

const Query = graphql`
  query ResultClubsFeedQuery {
    viewer {
      ...MetaClubsFeedViewerFragment
    }
    ...MetaClubsFeedFragment
  }
`

export default function ResultClubsFeed (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultClubsFeedQuery>(
    Query,
    query
  )

  return (
    <MetaClubsFeed rootQuery={queryData} viewerQuery={queryData.viewer} />
  )
}
