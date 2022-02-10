import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PostReviewFragment$key } from '@//:artifacts/PostReviewFragment.graphql'
import { HStack, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import {
  PostClickableCategories,
  PostClickableCharacters,
  PostFooter,
  PostHeaderClub,
  PostIndexer,
  PostVideoManagerContext
} from '@//:modules/content/Posts'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostContent/PostGalleryPublicDetailed/PostGalleryPublicDetailed'

interface Props {
  query: PostReviewFragment$key | null
}

const PostFragment = graphql`
  fragment PostReviewFragment on Post {
    reference
    ...PostGalleryPublicDetailedFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
  }
`

export default function PostReview ({
  query
}: Props): JSX.Element {
  const data = useFragment<PostReviewFragment$key>(PostFragment, query)

  const {
    slidesCount,
    currentSlide
  } = useContext(PostVideoManagerContext)

  return (
    <Stack spacing={2}>
      <HStack spacing={3} justify='space-between' align='center'>
        <PostHeaderClub query={data} />
      </HStack>
      <PostGalleryPublicDetailed query={data} />
      <PostFooter
        centerItem={<PostIndexer
          length={slidesCount}
          currentIndex={currentSlide}
                    />}
      />
      <PostClickableCharacters query={data} />
      <PostClickableCategories query={data} />
    </Stack>
  )
}
