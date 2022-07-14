import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadContentModifyFragment$key } from '@//:artifacts/UploadContentModifyFragment.graphql'
import { Stack } from '@chakra-ui/react'
import ContentModifyPreview from './ContentModifyPreview/ContentModifyPreview'

interface Props {
  query: UploadContentModifyFragment$key
}

const Fragment = graphql`
  fragment UploadContentModifyFragment on Post {
    ...ContentModifyPreviewFragment
  }
`

export default function UploadContentModify ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  // TODO adding post description will go here as a separate component
  // TODO as well as any other bulk post content management tools

  return (
    <Stack spacing={1}>
      <ContentModifyPreview query={data} />
    </Stack>
  )
}
