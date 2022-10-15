import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultFeedQuery } from '@//:artifacts/ResultFeedQuery.graphql'
import { graphql } from 'react-relay'
import ContainerFeed from './ContainerFeed/ContainerFeed'
import EmptyFeed from './ContainerFeed/EmptyFeed/EmptyFeed'

interface Props {
  query: PreloadedQuery<ResultFeedQuery>
}

const Query = graphql`
  query ResultFeedQuery @preloadable {
    viewer {
      ...ContainerFeedViewerFragment
    }
  }
`

export default function ResultFeed (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultFeedQuery>(
    Query,
    query
  )

  if (queryData.viewer == null) {
    return <EmptyFeed />
  }

  return (
    <ContainerFeed viewerQuery={queryData.viewer} />
  )
}
