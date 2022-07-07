import SingleFileImageUploadUppy from '../../hooks/uppy/SingleFileImageUploadUppy'
import type { UppyFile } from '@uppy/core'
import { useState } from 'react'
import DisplaySingleFileImageUpload from './DisplaySingleFileImageUpload/DisplaySingleFileImageUpload'
import { useUpload } from '../../index'

type RemoveUploadType = () => void
type UploadedFile = UppyFile | undefined
type UploadProgress = number | undefined
type UploadResponse = string | undefined

export interface DisplayProps {
  removeUpload: RemoveUploadType
  file: UploadedFile
  progress: UploadProgress
  response: UploadResponse
}

export interface FileInputFormProps {
  isLoading?: boolean
  isInvalid: boolean
}

interface Props extends FileInputFormProps {
  onChange: (id) => void
}

export default function SingleFileImageUpload ({
  onChange,
  isInvalid,
  isLoading
}: Props): JSX.Element {
  const [progress, setProgress] = useState<UploadProgress>(undefined)

  const [file, setFile] = useState<UploadedFile>(undefined)

  const [response, setResponse] = useState<UploadResponse>(undefined)

  const onFileAdded = (file): void => {
    setFile(file)
  }

  const onUploadProgress = (file, progress): void => {
    setProgress(progress.bytesUploaded / progress.bytesTotal)
  }

  const onUploadSuccess = (file, response): void => {
    const url = response.uploadURL as string
    const fileId = url.substring(url.lastIndexOf('/') + 1)
    setResponse(fileId)
    setFile(file)
    onChange(fileId)
    setProgress(undefined)
  }

  const uppy = useUpload({
    uppy: SingleFileImageUploadUppy,
    onUploadSuccess: onUploadSuccess,
    onUploadProgress: onUploadProgress,
    onFileAdded: onFileAdded
  })

  const removeUpload: RemoveUploadType = () => {
    setResponse(undefined)
    setFile(undefined)
    setProgress(undefined)
    onChange('')
    uppy?.reset()
  }

  return (
    <DisplaySingleFileImageUpload
      uppy={uppy}
      removeUpload={removeUpload}
      file={file}
      progress={progress}
      response={response}
      isInvalid={isInvalid}
      isLoading={isLoading}
    />
  )
}
