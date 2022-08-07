import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostPublicHeaderFragment$key } from '@//:artifacts/PostPublicHeaderFragment.graphql'
import { PostPublicHeaderViewerFragment$key } from '@//:artifacts/PostPublicHeaderViewerFragment.graphql'
import { Heading, HeadingProps, HStack, Stack } from '@chakra-ui/react'
import ClubThumbnail from '../../../../../DataDisplay/Club/ClubThumbnail/ClubThumbnail'
import PostJoinClub from '../PostJoinClub/PostJoinClub'
import { LinkTile } from '../../../../../ContentSelection'
import PostHeaderClubJoin from '../PostHeaderClubJoin/PostHeaderClubJoin'
import PostDescriptionHeading from '../PostDescriptionHeading/PostDescriptionHeading'

interface Props {
  postQuery: PostPublicHeaderFragment$key
  viewerQuery: PostPublicHeaderViewerFragment$key | null
  descriptionProps?: HeadingProps
}

const PostFragment = graphql`
  fragment PostPublicHeaderFragment on Post {
    club {
      name
      slug
      ...ClubThumbnailFragment
      ...PostJoinClubFragment
    }
    description
    ...PostHeaderClubJoinFragment
    ...PostDescriptionHeadingFragment
  }
`

const ViewerFragment = graphql`
  fragment PostPublicHeaderViewerFragment on Account {
    ...PostJoinClubViewerFragment
    ...PostHeaderClubJoinViewerFragment
  }
`

export default function PostPublicHeader ({
  postQuery,
  viewerQuery,
  descriptionProps
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (postData.description.length === 0) {
    return (
      <PostHeaderClubJoin postQuery={postData} viewerQuery={viewerData} />
    )
  }

  return (
    <HStack align='flex-start' spacing={2}>
      <LinkTile
        borderRadius='base'
        href={{
          pathname: '/[slug]',
          query: { slug: postData.club.slug }
        }}
      >
        <ClubThumbnail
          h={12}
          w={12}
          query={postData.club}
        />
      </LinkTile>
      <Stack spacing={0}>
        <HStack align='center' justify='space-between'>
          <Heading color='gray.00' fontSize='xl'>
            {postData.club.name}
          </Heading>
          <PostJoinClub clubQuery={postData.club} viewerQuery={viewerData} />
        </HStack>
        <PostDescriptionHeading postQuery={postData} {...descriptionProps} />
      </Stack>
    </HStack>
  )
}
