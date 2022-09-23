import { Stack } from '@chakra-ui/react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import UploadFileDisplay
  from '@//:modules/content/HookedComponents/Upload/components/UploadFileDisplay/UploadFileDisplay'
import { UppyFile } from '@uppy/core'
import CreatePostContentFilePicker
  from '@//:modules/content/HookedComponents/Upload/components/CreatePostContentFilePicker/CreatePostContentFilePicker'
import Head from 'next/head'
import usePreventWindowUnload from '@//:modules/hooks/usePreventWindowUnload'
import { useEffect, useState } from 'react'

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

  const [isUploading, setUploading] = useState(false)

  usePreventWindowUnload(isUploading)

  useEffect(() => {
    setUploading(Object.values(state.files).length > 0)
  }, [state.files])

  if (Object.values(state.files).length < 1) {
    return <CreatePostContentFilePicker uppy={uppy} />
  }

  return (
    <Stack spacing={2}>
      <Head>
        <title>
          Uploading Content... - overdoll
        </title>
      </Head>
      {Object.values(state.files).map((file: UppyFile) => {
        return (
          <UploadFileDisplay
            error={state.errors[file.id]}
            key={file.id}
            file={file}
            uppy={uppy}
            isDisabled={isDisabled}
          />
        )
      })}
    </Stack>
  )
}
