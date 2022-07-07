import { useEffect, useRef } from 'react'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Uppy } from '@uppy/core'
import { UseUploadProps, UseUploadReturnType } from '../../types'

export default function useUpload (props: UseUploadProps): UseUploadReturnType {
  const {
    uppy: InitialUppy,
    onFileAdded,
    onUploadSuccess,
    onUploadProgress
  } = props

  const notify = useToast()

  const initialUppy = useRef<Uppy | undefined>(undefined)
  if (initialUppy.current === undefined) {
    initialUppy.current = InitialUppy
  }

  const uppy = initialUppy.current

  useEffect(() => {
    const callBackFn = (file, response): void => {
      onUploadSuccess?.(file, response)
    }

    uppy.on('upload-success', callBackFn)

    return () => {
      uppy.off('upload-success', callBackFn)
    }
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    const callBackFn = (file, progress): void => {
      onUploadProgress?.(file, progress)
    }
    uppy.on('upload-progress', callBackFn)

    return () => {
      uppy.off('upload-progress', callBackFn)
    }
  }, [uppy])

  // file-added- uppy file was added
  useEffect(() => {
    const callBackFn = (file): void => {
      onFileAdded?.(file)
    }

    uppy.on('file-added', callBackFn)
    return () => {
      uppy.off('file-added', callBackFn)
    }
  }, [uppy])

  // Event for errors
  useEffect(() => {
    const callBackFn = (): void => {
      const info = uppy.getState().info

      if (info == null) return

      const message = `${info.message}`

      notify({
        status: 'error',
        title: message
      })
    }

    uppy.on('info-visible', callBackFn)

    return () => {
      uppy.off('info-visible', callBackFn)
    }
  }, [uppy])

  return uppy
}
