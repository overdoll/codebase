import { Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import PostGalleryPublicDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryPublicDetailed/PostGalleryPublicDetailed'
import { PostHeaderClub } from '@//:modules/content/Posts'

interface Props {
  query: PostPreviewFragment$key
}

const PostPreviewGQL = graphql`
  fragment PostPreviewFragment on Post {
    ...PostGalleryPublicDetailedFragment
    ...PostHeaderClubFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(PostPreviewGQL, query)

  return (
    <Stack spacing={2} direction='column'>
      <PostHeaderClub query={data} />
      <PostGalleryPublicDetailed query={data} />
    </Stack>
  )
}
