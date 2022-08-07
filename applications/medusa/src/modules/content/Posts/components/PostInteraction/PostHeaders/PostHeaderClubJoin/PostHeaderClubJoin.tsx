import type { PostHeaderClubJoinFragment$key } from '@//:artifacts/PostHeaderClubJoinFragment.graphql'
import type { PostHeaderClubJoinViewerFragment$key } from '@//:artifacts/PostHeaderClubJoinViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ButtonProps, HStack } from '@chakra-ui/react'
import { PostHeaderClub } from '../../../../index'
import PostJoinClub from '../PostJoinClub/PostJoinClub'
import { LinkTile } from '../../../../../ContentSelection'

interface Props extends ButtonProps {
  postQuery: PostHeaderClubJoinFragment$key
  viewerQuery: PostHeaderClubJoinViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostHeaderClubJoinFragment on Post {
    club {
      slug
      ...PostJoinClubFragment
    }
    ...PostHeaderClubFragment

  }
`

const ViewerFragment = graphql`
  fragment PostHeaderClubJoinViewerFragment on Account {
    ...PostJoinClubViewerFragment
  }
`

export default function PostHeaderClubJoin ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <HStack spacing={3} justify='space-between' align='center'>
      <LinkTile
        borderRadius='base'
        href={{
          pathname: '/[slug]',
          query: { slug: postData.club.slug }
        }}
      >
        <PostHeaderClub query={postData} />
      </LinkTile>
      <PostJoinClub clubQuery={postData.club} viewerQuery={viewerData} />
    </HStack>
  )
}
