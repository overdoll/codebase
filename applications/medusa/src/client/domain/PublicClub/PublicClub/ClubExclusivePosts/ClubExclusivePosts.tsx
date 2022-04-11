import { graphql, usePaginationFragment } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { ClubExclusivePostsFragment$key } from '@//:artifacts/ClubExclusivePostsFragment.graphql'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import PostsHorizontalPreview from '../PostsHorizontalPreview/PostsHorizontalPreview'
import { configMap } from '../../../../../modules/content/Posts/components/PostNavigation/PostsSearch/constants'
import { ClubPublicPageQuery } from '@//:artifacts/ClubPublicPageQuery.graphql'

interface Props {
  query: ClubExclusivePostsFragment$key
}

const Fragment = graphql`
  fragment ClubExclusivePostsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 10}
    after: {type: String}
  )
  @refetchable(queryName: "ClubExclusivePostsPaginationQuery" ) {
    slug
    exclusivePosts: posts(first: $first, after: $after, sortBy: NEW, supporterOnlyStatus: [FULL, PARTIAL])
    @connection (key: "ClubExclusivePosts_exclusivePosts") {
      edges {
        __typename
      }
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubExclusivePosts ({ query }: Props): JSX.Element {
  const {
    data,
    hasNext
  } = usePaginationFragment<ClubPublicPageQuery, any>(
    Fragment,
    query
  )

  const newPostsEncodedQuery = encodeQueryParams(configMap, {
    sort: 'NEW',
    supporter: ['FULL', 'PARTIAL']
  })

  return (
    <Box>
      <PostsHorizontalPreview
        hasNext={hasNext}
        to={`/${data.slug as string}/posts?${stringify(newPostsEncodedQuery)}`}
        query={data.exclusivePosts}
      />
    </Box>
  )
}
