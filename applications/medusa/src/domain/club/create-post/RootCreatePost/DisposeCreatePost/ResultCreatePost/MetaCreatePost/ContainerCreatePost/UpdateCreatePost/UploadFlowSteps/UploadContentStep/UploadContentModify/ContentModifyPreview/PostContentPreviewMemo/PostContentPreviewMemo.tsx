import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentPreviewMemoFragment$key } from '@//:artifacts/PostContentPreviewMemoFragment.graphql'
import type { PostContentPreviewMemoPostFragment$key } from '@//:artifacts/PostContentPreviewMemoPostFragment.graphql'
import { useMemo } from 'react'
import PostContentPreview from '../PostContentPreview/PostContentPreview'

interface Props {
  query: PostContentPreviewMemoFragment$key
  postQuery: PostContentPreviewMemoPostFragment$key
}

const Fragment = graphql`
  fragment PostContentPreviewMemoFragment on PostContent {
    resource {
      processed
      progress {
        state
        progress
      }
      failed
    }
    ...PostContentPreviewFragment
  }
`

const PostFragment = graphql`
  fragment PostContentPreviewMemoPostFragment on Post {
    ...PostContentPreviewPostFragment
  }
`

export default function PostContentPreviewMemo ({
  query,
  postQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const postData = useFragment(PostFragment, postQuery)

  return useMemo(() => <PostContentPreview query={data} postQuery={postData} />, [data?.resource])
}
