import { Stack } from '@chakra-ui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import UploadFileDisplay
  from '@//:modules/content/HookedComponents/Upload/components/UploadFileDisplay/UploadFileDisplay'
import { UppyFile } from '@uppy/core'
import CreatePostContentFilePicker
  from '@//:modules/content/HookedComponents/Upload/components/CreatePostContentFilePicker/CreatePostContentFilePicker'

interface Props {
  isDisabled: boolean
}

export default function ContentFilesDisplay ({
  isDisabled
}: Props): JSX.Element {
  const uppy = useUppyContext()
  const {
    state
  } = useSequenceContext()

  if (Object.values(state.files).length < 1) {
    return <CreatePostContentFilePicker uppy={uppy} />
  }

  return (
    <Stack spacing={2}>
      {Object.values(state.files).map((file: UppyFile, index) => {
        return (
          <UploadFileDisplay
            error={state.errors[file.id]}
            key={index}
            file={file}
            uppy={uppy}
            isDisabled={isDisabled}
          />
        )
      })}
    </Stack>
  )
}
