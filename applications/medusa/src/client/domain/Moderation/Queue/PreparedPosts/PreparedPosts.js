/**
 * @flow
 */
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { PreparedPostsQuery } from '@//:artifacts/PreparedPostsQuery.graphql'
import Posts from './Posts/Posts'

const PostsQueryGQL = graphql`
  query PreparedPostsQuery {
    viewer {
      ...PostsFragment
    }
    ...RejectionReasonsFragment
  }
`

type Props = {
  query: PreloadedQueryInner<PreparedPostsQuery>,
}

export default function PreparedPosts (props: Props): Node {
  const data = usePreloadedQuery<PreparedPostsQuery>(
    PostsQueryGQL,
    props.query
  )

  return (
    <Posts
      query={data} posts={data?.viewer}
    />
  )
}
