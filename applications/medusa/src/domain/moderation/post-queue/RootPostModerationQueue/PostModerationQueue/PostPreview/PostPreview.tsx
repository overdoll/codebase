import { Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostPreviewFragment$key } from '@//:artifacts/PostPreviewFragment.graphql'
import PostGalleryStaffDetailed
  from '@//:modules/content/Posts/components/PostData/PostGalleryStaffDetailed/PostGalleryStaffDetailed'
import PostPrivateHeader
  from '@//:modules/content/Posts/components/PostInteraction/PostHeaders/PostPrivateHeader/PostPrivateHeader'

interface Props {
  query: PostPreviewFragment$key
}

const Fragment = graphql`
  fragment PostPreviewFragment on Post {
    ...PostGalleryStaffDetailedFragment
    ...PostPrivateHeaderFragment
  }
`

export default function PostPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2} direction='column'>
      <PostPrivateHeader postQuery={data} />
      <PostGalleryStaffDetailed postQuery={data} />
    </Stack>
  )
}
