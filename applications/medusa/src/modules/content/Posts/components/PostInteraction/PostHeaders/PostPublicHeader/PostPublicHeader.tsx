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
  redirectToPost?: boolean
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
    reference
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

export default function PostPublicHeader (props: Props): JSX.Element {
  const {
    postQuery,
    viewerQuery,
    descriptionProps,
    redirectToPost = false
  } = props

  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const href = redirectToPost
    ? {
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: postData.club.slug,
          reference: postData.reference
        }
      }
    : {
        pathname: '/[slug]',
        query: { slug: postData.club.slug }
      }

  if (postData.description.length === 0) {
    return (
      <PostHeaderClubJoin href={href} postQuery={postData} viewerQuery={viewerData} />
    )
  }

  // TODO re-add ability to get slide index

  return (
    <HStack align='flex-start' spacing={2}>
      <LinkTile
        w={12}
        borderRadius='md'
        href={href}
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
