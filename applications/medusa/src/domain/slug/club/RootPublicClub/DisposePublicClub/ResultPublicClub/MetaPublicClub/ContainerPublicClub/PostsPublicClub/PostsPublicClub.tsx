import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostsPublicClubFragment$key } from '@//:artifacts/PostsPublicClubFragment.graphql'
import { PostsPublicClubViewerFragment$key } from '@//:artifacts/PostsPublicClubViewerFragment.graphql'
import ClubPublicPosts from './ClubPublicPosts/ClubPublicPosts'

interface Props {
  clubQuery: PostsPublicClubFragment$key
  viewerQuery: PostsPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment PostsPublicClubFragment on Club {
    ...ClubPublicPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment PostsPublicClubViewerFragment on Account {
    ...ClubPublicPostsViewerFragment
  }
`

export default function PostsPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ClubPublicPosts clubQuery={clubData} viewerQuery={viewerData} />
  )
}
