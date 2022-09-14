import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { CinematicPublicPostFragment$key } from '@//:artifacts/CinematicPublicPostFragment.graphql'
import { CinematicPublicPostViewerFragment$key } from '@//:artifacts/CinematicPublicPostViewerFragment.graphql'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'

interface Props {
  postQuery: CinematicPublicPostFragment$key
  viewerQuery: CinematicPublicPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment CinematicPublicPostFragment on Post {
    ...PostGalleryPublicDetailedFragment
  }
`

const ViewerFragment = graphql`
  fragment CinematicPublicPostViewerFragment on Account {
    ...PostGalleryPublicDetailedViewerFragment
  }
`

export default function CinematicPublicPost ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <PostGalleryPublicDetailed postQuery={postData} viewerQuery={viewerData} />
  )
}
