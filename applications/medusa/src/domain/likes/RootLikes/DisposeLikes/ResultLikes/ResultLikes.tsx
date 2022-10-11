import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultLikesQuery } from '@//:artifacts/ResultLikesQuery.graphql'
import { graphql } from 'react-relay'
import ContainerLikes from './ContainerLikes/ContainerLikes'

interface Props {
  query: PreloadedQuery<ResultLikesQuery>
}

const Query = graphql`
  query ResultLikesQuery @preloadable {
    viewer {
      ...ContainerLikesViewerFragment
    }
  }
`

export default function ResultLikes (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultLikesQuery>(
    Query,
    query
  )

  if (queryData.viewer == null) {
    return <></>
  }

  return (
    <ContainerLikes viewerQuery={queryData.viewer} />
  )
}
