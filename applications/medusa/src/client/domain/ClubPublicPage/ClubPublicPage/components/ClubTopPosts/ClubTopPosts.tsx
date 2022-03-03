import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { ClubTopPostsFragment$key } from '@//:artifacts/ClubTopPostsFragment.graphql'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import PostsHorizontalPreview from '../PostsHorizontalPreview/PostsHorizontalPreview'

interface Props {
  query: ClubTopPostsFragment$key
}

const Fragment = graphql`
  fragment ClubTopPostsFragment on Club {
    slug
    topPosts: posts(first: 10, sortBy: TOP) {
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubTopPosts ({ query }: Props): JSX.Element {
  const data = useFragment<ClubTopPostsFragment$key>(Fragment, query)

  const topPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'TOP'
  })

  return (
    <Box>
      <PostsHorizontalPreview
        to={`/${data.slug}/posts?${stringify(topPostsEncodedQuery)}`}
        query={data?.topPosts}
      />
    </Box>
  )
}
