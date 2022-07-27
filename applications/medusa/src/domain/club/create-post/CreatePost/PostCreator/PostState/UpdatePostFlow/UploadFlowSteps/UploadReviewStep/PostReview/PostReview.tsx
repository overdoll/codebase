import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostReviewFragment$key } from '@//:artifacts/PostReviewFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { PostClickableCategories, PostClickableCharacters, PostHeaderClub } from '@//:modules/content/Posts'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import PostDescription from '@//:modules/content/Posts/components/PostData/PostDescription/PostDescription'

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
  }
`

export default function PostReview ({
  query
}: Props): JSX.Element {
  const data = useFragment<PostReviewFragment$key>(Fragment, query)

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <PostHeaderClub query={data} />
        <PostDescription query={data} />
      </Stack>
      <PostGalleryPublicDetailed postQuery={data} viewerQuery={data.contributor} />
      <PostClickableCharacters query={data} />
      <PostClickableCategories query={data} />
    </Stack>
  )
}
