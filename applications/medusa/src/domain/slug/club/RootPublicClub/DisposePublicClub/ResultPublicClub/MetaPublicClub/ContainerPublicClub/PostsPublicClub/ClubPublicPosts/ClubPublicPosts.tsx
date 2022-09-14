import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPublicPostsFragment$key } from '@//:artifacts/ClubPublicPostsFragment.graphql'
import { ClubPublicPostsViewerFragment$key } from '@//:artifacts/ClubPublicPostsViewerFragment.graphql'
import ClubEmptyPosts from './ClubEmptyPosts/ClubEmptyPosts'
import RootClubPostsPreview from './RootClubPostsPreview/RootClubPostsPreview'

interface Props {
  clubQuery: ClubPublicPostsFragment$key
  viewerQuery: ClubPublicPostsViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubPublicPostsFragment on Club {
    posts(first: 1) {
      edges {
        node {
          __typename
        }
      }
    }
    ...ClubEmptyPostsFragment
    ...RootClubPostsPreviewFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubPublicPostsViewerFragment on Account {
    ...RootClubPostsPreviewViewerFragment
  }
`

export default function ClubPublicPosts ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.posts.edges.length < 1) {
    return (
      <ClubEmptyPosts clubQuery={clubData} />
    )
  }

  return (
    <RootClubPostsPreview clubQuery={clubData} viewerQuery={viewerData} />
  )
}
