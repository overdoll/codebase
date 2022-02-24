import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullSimplePostFragment$key } from '@//:artifacts/FullSimplePostFragment.graphql'
import { FullSimplePostViewerFragment$key } from '@//:artifacts/FullSimplePostViewerFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import {
  PostFooter,
  PostGalleryPublicSimple,
  PostHeaderClub,
  PostIndexer,
  PostLikeButton,
  PostMenu,
  PostVideoManagerContext
} from '@//:modules/content/Posts'
import JoinClubButton from '../../../domain/ManageClub/components/JoinClubButton/JoinClubButton'

interface Props {
  query: FullSimplePostFragment$key
  viewerQuery: FullSimplePostViewerFragment$key
}

const PostFragment = graphql`
  fragment FullSimplePostFragment on Post {
    id
    ...PostGalleryPublicSimpleFragment
    ...PostMenuFragment
    ...PostLikeButtonFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    club {
      ...JoinClubButtonClubFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment FullSimplePostViewerFragment on Account {
    ...JoinClubButtonViewerFragment
  }
`

export default function FullSimplePost ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment<FullSimplePostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullSimplePostViewerFragment$key>(ViewerFragment, viewerQuery)

  const {
    slidesCount,
    currentSlide
  } = useContext(PostVideoManagerContext)

  return (
    <Stack spacing={1}>
      <HStack spacing={3} justify='space-between' align='center'>
        <PostHeaderClub query={data} />
        <JoinClubButton
          size='sm'
          clubQuery={data?.club ?? null}
          viewerQuery={viewerData}
        />
      </HStack>
      <PostGalleryPublicSimple query={data} />
      <PostFooter
        leftItem={<PostLikeButton size='sm' query={data} />}
        centerItem={<PostIndexer
          length={slidesCount}
          currentIndex={currentSlide}
                    />}
        rightItem={<PostMenu size='sm' query={data} />}
      />
    </Stack>
  )
}
