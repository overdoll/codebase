import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostReviewFragment$key } from '@//:artifacts/PostReviewFragment.graphql'
import { Stack } from '@chakra-ui/react'
import { PostClickableCategories, PostClickableCharacters } from '@//:modules/content/Posts'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import PostPrivateHeader from '@//:modules/content/Posts/components/PostInteraction/PostHeaders/PostPrivateHeader/PostPrivateHeader'

interface Props {
  query: PostReviewFragment$key
}

const Fragment = graphql`
  fragment PostReviewFragment on Post {
    contributor {
      ...PostGalleryPublicDetailedViewerFragment
    }
    ...PostGalleryPublicDetailedFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostDescriptionFragment
    ...PostPrivateHeaderFragment
  }
`

export default function PostReview ({
  query
}: Props): JSX.Element {
  const data = useFragment<PostReviewFragment$key>(Fragment, query)

  return (
    <Stack spacing={2}>
      <PostPrivateHeader postQuery={data} />
      <PostGalleryPublicDetailed postQuery={data} viewerQuery={data.contributor} />
      <PostClickableCharacters query={data} />
      <PostClickableCategories query={data} />
    </Stack>
  )
}
