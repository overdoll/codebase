import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadContentStepFragment$key } from '@//:artifacts/UploadContentStepFragment.graphql'
import { Stack } from '@chakra-ui/react'
import UploadContentSuggestions from './UploadContentSuggestions/UploadContentSuggestions'
import UploadContentModify from './UploadContentModify/UploadContentModify'
import UploadContentAdd from './UploadContentAdd/UploadContentAdd'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import FileInputOverlay from '@//:modules/content/HookedComponents/Upload/components/FileInputOverlay/FileInputOverlay'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

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

  const uppy = useUppyContext()

  const {
    state
  } = useSequenceContext()

  return (
    <Stack spacing={2}>
      <UploadContentSuggestions query={data} />
      <FileInputOverlay isDisabled={Object.values(state.files).length > 0} onlyDrop uppy={uppy}>
        <Stack spacing={2}>
          <UploadContentModify query={data} />
          <UploadContentAdd query={data} />
        </Stack>
      </FileInputOverlay>
    </Stack>
  )
}
