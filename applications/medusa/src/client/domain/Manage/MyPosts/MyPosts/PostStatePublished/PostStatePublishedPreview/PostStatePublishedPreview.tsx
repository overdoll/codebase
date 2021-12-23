import { graphql } from 'react-relay/hooks'
import type { PostStatePublishedPreviewFragment$key } from '@//:artifacts/PostStatePublishedPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import PostGalleryContent from '../../../../../../components/Posts/PostGalleryContent/PostGalleryContent'

interface Props {
  query: PostStatePublishedPreviewFragment$key
}

// TODO this is a placeholder - we probably want to give
// TODO more information and control over the post here
// TODO like clicking on it will take them to the public post

const Fragment = graphql`
  fragment PostStatePublishedPreviewFragment on Post {
    ...PostGalleryContentFragment
  }
`

export default function PostStatePublishedPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <PostGalleryContent query={data} />
  )
}
