import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { FullDetailedPostFragment$key } from '@//:artifacts/FullDetailedPostFragment.graphql'
import { FullDetailedPostViewerFragment$key } from '@//:artifacts/FullDetailedPostViewerFragment.graphql'
import { Stack } from '@chakra-ui/react'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import PostClickableCharacters
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCharacters/PostClickableCharacters'
import PostClickableCategories
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCategories/PostClickableCategories'
import PostHeader from '@//:modules/content/Posts/components/PostInteraction/PostHeader/PostHeader'
import PostFooterButtons from '@//:modules/content/Posts/components/PostInteraction/PostFooterButtons/PostFooterButtons'
import PostDescription from '@//:modules/content/Posts/components/PostData/PostDescription/PostDescription'

interface Props {
  query: FullDetailedPostFragment$key
  viewerQuery: FullDetailedPostViewerFragment$key | null
}

const PostFragment = graphql`
  fragment FullDetailedPostFragment on Post {
    ...PostGalleryPublicDetailedFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostHeaderFragment
    ...PostFooterButtonsFragment
    ...PostDescriptionFragment
  }
`

const ViewerFragment = graphql`
  fragment FullDetailedPostViewerFragment on Account {
    ...PostHeaderViewerFragment
    ...PostGalleryPublicDetailedViewerFragment
    ...PostFooterButtonsViewerFragment
  }
`

export default function FullDetailedPost ({
  query,
  viewerQuery
}: Props): JSX.Element {
  const data = useFragment<FullDetailedPostFragment$key>(PostFragment, query)
  const viewerData = useFragment<FullDetailedPostViewerFragment$key>(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <PostHeader postQuery={data} viewerQuery={viewerData} />
          <PostDescription query={data} />
        </Stack>
        <PostGalleryPublicDetailed postQuery={data} viewerQuery={viewerData} />
        <PostFooterButtons postQuery={data} viewerQuery={viewerData} />
      </Stack>
      <Stack spacing={2}>
        <PostClickableCharacters query={data} />
        <PostClickableCategories query={data} />
      </Stack>
    </Stack>
  )
}
