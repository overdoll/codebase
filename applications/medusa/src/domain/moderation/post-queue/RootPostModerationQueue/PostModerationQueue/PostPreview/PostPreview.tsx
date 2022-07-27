import { Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import { PostHeaderClub } from '@//:modules/content/Posts'
import PostGalleryStaffDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryStaffDetailed/PostGalleryStaffDetailed'
import PostDescription from '@//:modules/content/Posts/components/PostData/PostDescription/PostDescription'

interface Props {
  query: PostPreviewFragment$key
}

const Fragment = graphql`
  fragment PostPreviewFragment on Post {
    ...PostGalleryStaffDetailedFragment
    ...PostHeaderClubFragment
    ...PostDescriptionFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2} direction='column'>
      <Stack spacing={1}>
        <PostHeaderClub query={data} />
        <PostDescription query={data} />
      </Stack>
      <PostGalleryStaffDetailed postQuery={data} />
    </Stack>
  )
}
