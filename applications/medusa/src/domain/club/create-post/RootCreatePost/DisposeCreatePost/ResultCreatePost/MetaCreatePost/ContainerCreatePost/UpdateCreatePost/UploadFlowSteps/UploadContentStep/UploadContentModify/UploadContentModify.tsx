import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadContentModifyFragment$key } from '@//:artifacts/UploadContentModifyFragment.graphql'
import { Stack } from '@chakra-ui/react'
import ContentModifyPreview from './ContentModifyPreview/ContentModifyPreview'
import UploadPostOptions from './UploadPostOptions/UploadPostOptions'
import PostUpdateDescription from './PostUpdateDescription/PostUpdateDescription'

interface Props {
  query: UploadContentModifyFragment$key
}

const Fragment = graphql`
  fragment UploadContentModifyFragment on Post {
    ...ContentModifyPreviewFragment
    ...UploadPostOptionsFragment
    ...PostUpdateDescriptionFragment
  }
`

export default function UploadContentModify ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <UploadPostOptions query={data} />
      <PostUpdateDescription query={data} />
      <ContentModifyPreview query={data} />
    </Stack>
  )
}
