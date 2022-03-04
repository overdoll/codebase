import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullSimplePostFragment$key } from '@//:artifacts/FullSimplePostFragment.graphql'
import { FullSimplePostViewerFragment$key } from '@//:artifacts/FullSimplePostViewerFragment.graphql'
import { Flex, HStack, Stack } from '@chakra-ui/react'
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
import JoinClubButton from '../../../domain/ClubPublicPage/ClubPublicPage/components/JoinClubButton/JoinClubButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'

interface Props {
  query: FullSimplePostFragment$key
  viewerQuery: FullSimplePostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullSimplePostFragment on Post {
    ...PostGalleryPublicSimpleFragment
    ...PostMenuFragment
    ...PostLikeButtonFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    club {
      ...JoinClubButtonClubFragment
    }
    reference
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
    <Stack h='100%' justify='space-between' spacing={1}>
      <HStack spacing={3} justify='space-between' align='center'>
        <PostHeaderClub query={data} />
        <JoinClubButton
          size='sm'
          clubQuery={data?.club ?? null}
          viewerQuery={viewerData}
        />
      </HStack>
      <PostGalleryPublicSimple query={data} />
      <Stack spacing={1}>
        <PostFooter
          leftItem={(
            <PostLikeButton size='sm' query={data} />
          )}
          centerItem={(
            <PostIndexer
              length={slidesCount}
              currentIndex={currentSlide}
            />)}
          rightItem={<PostMenu variant='ghost' size='sm' query={data} />}
        />
      </Stack>
    </Stack>
  )
}
