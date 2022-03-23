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
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'

interface Props {
  query: PostReviewFragment$key
}

const PostFragment = graphql`
  fragment PostReviewFragment on Post {
    ...PostGalleryPublicDetailedFragment
    ...PostHeaderClubFragment
    ...PostClickableCharactersFragment
    ...PostClickableCategoriesFragment
    ...PostIndexerFragment
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
          query={data}
          length={slidesCount}
          currentIndex={currentSlide}
                    />}
      />
      <PostClickableCharacters query={data} />
      <PostClickableCategories query={data} />
    </Stack>
  )
}
