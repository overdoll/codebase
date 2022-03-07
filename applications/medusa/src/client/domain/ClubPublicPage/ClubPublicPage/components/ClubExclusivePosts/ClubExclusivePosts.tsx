import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import type { ClubExclusivePostsFragment$key } from '@//:artifacts/ClubExclusivePostsFragment.graphql'
import { encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import PostsHorizontalPreview from '../PostsHorizontalPreview/PostsHorizontalPreview'

interface Props {
  query: ClubExclusivePostsFragment$key
}

const Fragment = graphql`
  fragment ClubExclusivePostsFragment on Club {
    slug
    exclusivePosts: posts(first: 10, sortBy: NEW) {
      ...PostsHorizontalPreviewFragment
    }
  }
`

export default function ClubExclusivePosts ({ query }: Props): JSX.Element {
  const data = useFragment<ClubExclusivePostsFragment$key>(Fragment, query)

  const newPostsEncodedQuery = encodeQueryParams({
    sort: StringParam
  }, {
    sort: 'NEW'
  })

  return (
    <Box>
      <PostsHorizontalPreview
        to={`/${data.slug}/posts?${stringify(newPostsEncodedQuery)}`}
        query={data?.exclusivePosts}
      />
    </Box>
  )
}
