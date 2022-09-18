import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostsPublicClubFragment$key } from '@//:artifacts/PostsPublicClubFragment.graphql'
import ClubPublicPosts from './ClubPublicPosts/ClubPublicPosts'

interface Props {
  clubQuery: PostsPublicClubFragment$key
}

const ClubFragment = graphql`
  fragment PostsPublicClubFragment on Club {
    ...ClubPublicPostsFragment
  }
`

export default function PostsPublicClub (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <ClubPublicPosts clubQuery={clubData} />
  )
}
