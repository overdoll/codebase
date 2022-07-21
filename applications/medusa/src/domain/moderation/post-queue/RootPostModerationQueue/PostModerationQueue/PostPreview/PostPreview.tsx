import { Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import { PostHeaderClub } from '@//:modules/content/Posts'
import PostGalleryStaffDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryStaffDetailed/PostGalleryStaffDetailed'

interface Props {
  query: PostPreviewFragment$key
}

const Fragment = graphql`
  fragment PostPreviewFragment on Post {
    ...PostGalleryStaffDetailedFragment
    ...PostHeaderClubFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2} direction='column'>
      <PostHeaderClub query={data} />
      <PostGalleryStaffDetailed postQuery={data} />
    </Stack>
  )
}
