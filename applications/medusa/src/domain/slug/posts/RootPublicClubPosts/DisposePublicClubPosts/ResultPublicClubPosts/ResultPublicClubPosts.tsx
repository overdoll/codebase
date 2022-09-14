import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultPublicClubPostsQuery } from '@//:artifacts/ResultPublicClubPostsQuery.graphql'
import { graphql } from 'react-relay'
import EmptyPublicClubPosts from './EmptyPublicClubPosts/EmptyPublicClubPosts'
import MetaPublicClubPosts from './MetaPublicClubPosts/MetaPublicClubPosts'

interface Props {
  query: PreloadedQuery<ResultPublicClubPostsQuery>
}

const Query = graphql`
  query ResultPublicClubPostsQuery($slug: String!,
    $sortBy: PostsSort!,
    $categorySlugs: [String!],
    $seriesSlugs: [String!],
    $characterSlugs: [String!],
    $supporterOnlyStatus: [SupporterOnlyStatus!],
    $seed: String
  ) {
    club(slug: $slug) {
      ...MetaPublicClubPostsFragment
    }
    viewer {
      ...MetaPublicClubPostsViewerFragment
    }
  }
`

export default function ResultPublicClubPosts (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ResultPublicClubPostsQuery>(
    Query,
    props.query
  )

  if (queryData?.club == null) {
    return <EmptyPublicClubPosts />
  }

  return (
    <MetaPublicClubPosts clubQuery={queryData.club} viewerQuery={queryData.viewer} />
  )
}
