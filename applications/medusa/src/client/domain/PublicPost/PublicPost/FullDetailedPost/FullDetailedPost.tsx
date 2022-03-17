import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullDetailedPostFragment$key } from '@//:artifacts/FullDetailedPostFragment.graphql'
import { FullDetailedPostViewerFragment$key } from '@//:artifacts/FullDetailedPostViewerFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import {
  PostFooter,
  PostHeaderClub,
  PostIndexer,
  PostLikeButton,
  PostMenu,
  PostVideoManagerContext
} from '@//:modules/content/Posts'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import PostClickableCharacters
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCategories/PostClickableCategories'
import PostCopyLinkButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostCopyLinkButton/PostCopyLinkButton'
import PostReportButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostReportButton/PostReportButton'
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import JoinClubFromPost
  from '../../../ClubPublicPage/ClubPublicPage/components/JoinClubButton/JoinClubFromPost/JoinClubFromPost'

interface Props {
  query: FullDetailedPostFragment$key
  viewerQuery: FullDetailedPostViewerFragment$key
}

const PostFragment = graphql`
  fragment FullDetailedPostFragment on Post {
    reference
    ...PostGalleryPublicDetailedFragment
    ...PostCopyLinkButtonFragment
    ...PostReportButtonFragment
    ...PostModerateButtonFragment
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
  fragment FullDetailedPostViewerFragment on Account {
    ...JoinClubFromPostViewerFragment
  }
`

export default function FullDetailedPost ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment<FullDetailedPostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullDetailedPostViewerFragment$key>(ViewerFragment, viewerQuery)

  const {
    slidesCount,
    currentSlide
  } = useContext(PostVideoManagerContext)

  return (
    <Stack spacing={8}>
      <Stack h='100%' justify='space-between' spacing={2}>
        <HStack spacing={3} justify='space-between' align='center'>
          <PostHeaderClub query={data} />
          <JoinClubFromPost size='sm' clubQuery={data?.club} viewerQuery={viewerData} />
        </HStack>
        <PostGalleryPublicDetailed query={data} />
        <PostFooter
          leftItem={<PostLikeButton size='sm' query={data} />}
          centerItem={<PostIndexer
            query={data}
            length={slidesCount}
            currentIndex={currentSlide}
                      />}
          rightItem={(
            <PostMenu variant='ghost' size='sm'>
              <PostCopyLinkButton query={data} />
              <PostReportButton query={data} />
              <PostModerateButton query={data} />
            </PostMenu>)}
        />
      </Stack>
      <Stack spacing={2}>
        <PostClickableCharacters query={data} />
        <PostClickableCategories query={data} />
      </Stack>
    </Stack>
  )
}
