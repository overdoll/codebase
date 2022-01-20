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
import JoinClubButton from '../../../../ManageClub/components/JoinClubButton/JoinClubButton'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/Content/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import CopyLinkToClipboard from '../../../../../components/ContentHints/CopyLinkToClipboard/CopyLinkToClipboard'
import PostClickableCharacters
  from '../../../../../../modules/content/Posts/components/Interaction/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories
  from '../../../../../../modules/content/Posts/components/Interaction/PostClickableCategories/PostClickableCategories'

interface Props {
  query: FullDetailedPostFragment$key | null
  viewerQuery: FullDetailedPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullDetailedPostFragment on Post {
    reference
    ...PostGalleryPublicDetailedFragment
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
  fragment FullDetailedPostViewerFragment on Account {
    ...JoinClubButtonViewerFragment
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
    <Stack spacing={2}>
      <HStack spacing={3} justify='space-between' align='center'>
        <PostHeaderClub query={data} />
        <JoinClubButton size='md' clubQuery={data?.club ?? null} viewerQuery={viewerData} />
      </HStack>
      <PostGalleryPublicDetailed query={data} />
      <PostFooter
        leftItem={<PostLikeButton query={data} />}
        centerItem={<PostIndexer
          length={slidesCount}
          currentIndex={currentSlide}
                    />}
        rightItem={<PostMenu query={data} />}
      />
      <CopyLinkToClipboard w='100%'>
        {`https://overdoll.com/p/${data?.reference as string}`}
      </CopyLinkToClipboard>
      <PostClickableCharacters query={data} />
      <PostClickableCategories query={data} />
    </Stack>
  )
}
