import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentRichObjectFragment$key } from '@//:artifacts/PostContentRichObjectFragment.graphql'
import React from 'react'
import MediaRichObject from '../MediaRichObject/MediaRichObject'

interface Props {
  query: PostContentRichObjectFragment$key
}

const PostFragment = graphql`
  fragment PostContentRichObjectFragment on Post {
    content {
      media {
        ...MediaRichObjectFragment
      }
    }
  }
`

export default function PostContentRichObject (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(PostFragment, query)

  // only show the first piece of post content
  const content = data?.content?.[0]

  return <MediaRichObject query={content.media} />
}
