/**
 * @flow
 */
import type { Node } from 'react'
import { graphql } from 'react-relay/hooks'
import type { PostStatePublishedPreviewFragment$key } from '@//:artifacts/PostStatePublishedPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import PostGalleryContent from '../../../../../../components/Posts/PostGalleryContent/PostGalleryContent'

type Props = {
  query: PostStatePublishedPreviewFragment$key,
};

// TODO this is a placeholder - we probably want to give
// TODO more information and control over the post here

const Fragment = graphql`
  fragment PostStatePublishedPreviewFragment on Post {
    ...PostGalleryContentFragment
  }
`

export default function PostStatePublishedPreview ({ query }: Props): Node {
  const data = useFragment(Fragment, query)

  return (
    <PostGalleryContent query={data} />
  )
}
