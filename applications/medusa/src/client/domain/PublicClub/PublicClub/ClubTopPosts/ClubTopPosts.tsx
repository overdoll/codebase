import { graphql, usePaginationFragment } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { ClubTopPostsFragment$key } from '@//:artifacts/ClubTopPostsFragment.graphql'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import PostsHorizontalPreview from '../PostsHorizontalPreview/PostsHorizontalPreview'
import { PublicClubQuery } from '@//:artifacts/PublicClubQuery.graphql'

interface Props {
  query: ClubTopPostsFragment$key
}

const Fragment = graphql`
  fragment ClubTopPostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubTopPostsPaginationQuery" ) {
    slug
    topPosts: posts(first: $first, after: $after, sortBy: TOP)
    @connection (key: "ClubTopPosts_topPosts") {
      edges {
        __typename
      }
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubTopPosts ({ query }: Props): JSX.Element {
  const {
    data,
    hasNext
  } = usePaginationFragment<PublicClubQuery, any>(
    Fragment,
    query
  )

  const topPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'TOP'
  })

  return (
    <Box>
      <PostsHorizontalPreview
        hasNext={hasNext}
        to={`/${data.slug as string}/posts?${stringify(topPostsEncodedQuery)}`}
        query={data.topPosts}
      />
    </Box>
  )
}
