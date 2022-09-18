import { graphql, useFragment } from 'react-relay/hooks'
import { ClubPublicPostsFragment$key } from '@//:artifacts/ClubPublicPostsFragment.graphql'
import ClubEmptyPosts from './ClubEmptyPosts/ClubEmptyPosts'
import RootClubPostsPreview from './RootClubPostsPreview/RootClubPostsPreview'

interface Props {
  clubQuery: ClubPublicPostsFragment$key
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

export default function ClubPublicPosts ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  if (clubData.posts.edges.length < 1) {
    return (
      <ClubEmptyPosts clubQuery={clubData} />
    )
  }

  return (
    <RootClubPostsPreview clubQuery={clubData} />
  )
}
