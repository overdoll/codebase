import SingleFileImageUploadUppy from '../../hooks/uppy/SingleFileImageUploadUppy'
import type { UppyFile } from '@uppy/core'
import { useState } from 'react'
import DisplaySingleFileImageUpload from './DisplaySingleFileImageUpload/DisplaySingleFileImageUpload'
import { useUpload } from '../../index'
import { useUpdateEffect } from '@chakra-ui/react'
import {
  FileErrorType,
  OnFileAddedType,
  OnFileRemovedType,
  OnUploadErrorType,
  OnUploadProgressType,
  OnUploadRetryType,
  OnUploadSuccessType
} from '../../types'
import getIdFromUppyUrl from '../../support/getIdFromUppyUrl/getIdFromUppyUrl'

type UploadedFile = UppyFile | undefined
type UploadUrl = string | undefined
type UploadError = FileErrorType | undefined

export interface DisplayProps {
  file: UploadedFile
  url: UploadUrl
  error?: UploadError
}

export interface FileInputFormProps {
  isLoading?: boolean
  isInvalid?: boolean
}

interface Props extends FileInputFormProps {
  onChange: (id) => void
}

export default function SingleFileImageUpload ({
  onChange,
  isInvalid,
  isLoading
}: Props): JSX.Element {
  const [file, setFile] = useState<UploadedFile>(undefined)
  const [url, setUrl] = useState<UploadUrl>(undefined)
  const [error, setError] = useState<UploadError>(undefined)

  const onFileAdded: OnFileAddedType = (file) => {
    setFile(file)
  }

  const onUploadProgress: OnUploadProgressType = (file) => {
    setFile(file)
  }

  const onUploadSuccess: OnUploadSuccessType = (file, response) => {
    const url = response.uploadURL as string
    const fileId = getIdFromUppyUrl(url)
    setUrl(fileId)
  }

  const onFileRemoved: OnFileRemovedType = () => {
    setUrl(undefined)
    setFile(undefined)
    uppy?.reset()
  }

  const onUploadError: OnUploadErrorType = (file, error, response) => {
    setError({
      error,
      response
    })
  }

  const onUploadRetry: OnUploadRetryType = () => {
    setError(undefined)
  }

  const uppy = useUpload({
    uppy: SingleFileImageUploadUppy,
    onUploadSuccess,
    onUploadProgress,
    onFileAdded,
    onFileRemoved,
    onUploadRetry,
    onUploadError
  })

  useUpdateEffect(() => {
    onChange(url != null ? url : '')
  }, [url])

  return (
    <DisplaySingleFileImageUpload
      uppy={uppy}
      file={file}
      url={url}
      error={error}
      isInvalid={isInvalid}
      isLoading={isLoading}
    />
  )
}
