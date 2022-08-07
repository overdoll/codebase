import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostPrivateHeaderFragment$key } from '@//:artifacts/PostPrivateHeaderFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import ClubThumbnail from '../../../../../DataDisplay/Club/ClubThumbnail/ClubThumbnail'
import PostHeaderClub from '../PostHeaderClub/PostHeaderClub'
import PostDescriptionHeading from '../PostDescriptionHeading/PostDescriptionHeading'

interface Props {
  postQuery: PostPrivateHeaderFragment$key
}

const PostFragment = graphql`
  fragment PostPrivateHeaderFragment on Post {
    club {
      ...ClubThumbnailFragment
      ...PostJoinClubFragment
      name
    }
    description
    ...PostHeaderClubFragment
    ...PostDescriptionHeadingFragment
  }
`

export default function PostPrivateHeader ({
  postQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)

  if (postData.description.length === 0) {
    return (
      <PostHeaderClub query={postData} />
    )
  }

  return (
    <HStack align='flex-start' spacing={2}>
      <ClubThumbnail
        h={12}
        w={12}
        query={postData.club}
      />
      <Stack spacing={0}>
        <Heading color='gray.00' fontSize='xl'>
          {postData.club.name}
        </Heading>
        <PostDescriptionHeading postQuery={postData} />
      </Stack>
    </HStack>
  )
}
