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
import PostCopyLinkButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostCopyLinkButton/PostCopyLinkButton'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import PostReportButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostReportButton/PostReportButton'
import PostViewButton from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostViewButton/PostViewButton'
import JoinClubFromPost
  from '../../../domain/ClubPublicPage/ClubPublicPage/components/JoinClubButton/JoinClubFromPost/JoinClubFromPost'

interface Props {
  query: FullSimplePostFragment$key
  viewerQuery: FullSimplePostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullSimplePostFragment on Post {
    ...PostGalleryPublicSimpleFragment
    ...PostViewButtonFragment
    ...PostModerateButtonFragment
    ...PostCopyLinkButtonFragment
    ...PostReportButtonFragment
    ...PostLikeButtonFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostIndexerFragment
    club @required(action: THROW) {
      ...JoinClubFromPostFragment
    }
  }
`

const ViewerFragment = graphql`
  fragment FullSimplePostViewerFragment on Account {
    ...PostLikeButtonViewerFragment
    ...JoinClubFromPostViewerFragment
    ...PostReportButtonViewerFragment
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
        <JoinClubFromPost size='sm' clubQuery={data?.club} viewerQuery={viewerData} />
      </HStack>
      <PostGalleryPublicSimple query={data} />
      <Stack spacing={1}>
        <PostFooter
          leftItem={(
            <PostLikeButton size='sm' query={data} viewerQuery={viewerData} />
          )}
          centerItem={(
            <PostIndexer
              query={data}
              length={slidesCount}
              currentIndex={currentSlide}
            />)}
          rightItem={(
            <PostMenu variant='ghost' size='sm'>
              <PostViewButton query={data} />
              <PostCopyLinkButton query={data} />
              <PostReportButton query={data} viewerQuery={viewerData} />
              <PostModerateButton query={data} />
            </PostMenu>)}
        />
      </Stack>
    </Stack>
  )
}
