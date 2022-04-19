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
import PostModerateButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostModerateButton/PostModerateButton'
import JoinClubFromPost
  from '../../../../../root/RootPublicClub/PublicClub/JoinClubButton/JoinClubFromPost/JoinClubFromPost'
import PostArchiveButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostArchiveButton/PostArchiveButton'
import PostUnArchiveButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostUnArchiveButton/PostUnArchiveButton'
import PostReportButton
  from '@//:modules/content/Posts/components/PostInteraction/PostMenu/PostReportButton/PostReportButton'

interface Props {
  query: FullDetailedPostFragment$key
  viewerQuery: FullDetailedPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullDetailedPostFragment on Post {
    reference
    state
    ...PostGalleryPublicDetailedFragment
    ...PostCopyLinkButtonFragment
    ...PostReportButtonFragment
    ...PostModerateButtonFragment
    ...PostLikeButtonFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostIndexerFragment
    ...PostArchiveButtonFragment
    ...PostUnArchiveButtonFragment
    club @required(action: THROW) {
      ...JoinClubFromPostFragment
      viewerIsOwner
    }
  }
`

const ViewerFragment = graphql`
  fragment FullDetailedPostViewerFragment on Account {
    ...PostReportButtonViewerFragment
    ...PostLikeButtonViewerFragment
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

  const ArchiveButton = (): JSX.Element => {
    if (data.club.viewerIsOwner) {
      if (data.state === 'ARCHIVED') {
        return <PostUnArchiveButton query={data} />
      }

      if (data.state === 'PUBLISHED') {
        return <PostArchiveButton query={data} />
      }
    }
    return <PostReportButton query={data} viewerQuery={viewerData} />
  }

  return (
    <Stack spacing={8}>
      <Stack h='100%' justify='space-between' spacing={2}>
        <HStack spacing={3} justify='space-between' align='center'>
          <PostHeaderClub query={data} />
          <JoinClubFromPost size='sm' clubQuery={data?.club} viewerQuery={viewerData} />
        </HStack>
        <PostGalleryPublicDetailed query={data} />
        <PostFooter
          leftItem={<PostLikeButton size='sm' query={data} viewerQuery={viewerData} />}
          centerItem={<PostIndexer
            query={data}
            length={slidesCount}
            currentIndex={currentSlide}
                      />}
          rightItem={(
            <PostMenu variant='ghost' size='sm'>
              {data.state === 'PUBLISHED' && <PostCopyLinkButton query={data} />}
              <ArchiveButton />
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
