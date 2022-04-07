import { Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import { PostFooter, PostHeaderClub, PostIndexer, PostVideoManagerContext } from '@//:modules/content/Posts'
import { useContext } from 'react'

interface Props {
  query: PostPreviewFragment$key
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostGalleryPublicDetailedFragment
    ...PostHeaderClubFragment
    ...PostIndexerFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(PostPreviewGQL, query)

  const {
    slidesCount,
    currentSlide
  } = useContext(PostVideoManagerContext)

  return (
    <Stack spacing={2} direction='column'>
      <PostHeaderClub query={data} />
      <PostGalleryPublicDetailed query={data} />
      <PostFooter
        centerItem={<PostIndexer
          query={data}
          length={slidesCount}
          currentIndex={currentSlide}
                    />}
      />
    </Stack>
  )
}
