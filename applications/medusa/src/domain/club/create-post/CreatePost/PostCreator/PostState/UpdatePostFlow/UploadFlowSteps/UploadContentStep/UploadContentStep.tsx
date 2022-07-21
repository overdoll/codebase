import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadContentStepFragment$key } from '@//:artifacts/UploadContentStepFragment.graphql'
import { Stack } from '@chakra-ui/react'
import UploadContentSuggestions from './UploadContentSuggestions/UploadContentSuggestions'
import UploadContentModify from './UploadContentModify/UploadContentModify'
import UploadContentAdd from './UploadContentAdd/UploadContentAdd'

interface Props {
  query: UploadContentStepFragment$key
}

const Fragment = graphql`
  fragment UploadContentStepFragment on Post {
    ...UploadContentSuggestionsFragment
    ...UploadContentModifyFragment
    ...UploadContentAddFragment
  }
`

export default function UploadContentStep ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={2}>
      <UploadContentSuggestions query={data} />
      <UploadContentModify query={data} />
      <UploadContentAdd query={data} />
    </Stack>
  )
}
