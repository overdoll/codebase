import { useEffect } from 'react'
import { useToast } from '../../../../ThemeComponents'
import { UppyFile } from '@uppy/core'
import { UseUploadProps, UseUploadReturnType } from '../../types'
import useUppy from '../useUppy/useUppy'

export default function useUpload (props: UseUploadProps): UseUploadReturnType {
  const {
    uppy: InitialUppy,
    onFileAdded,
    onUploadSuccess,
    onUploadProgress,
    onFileRemoved,
    onUploadError,
    onUploadRetry,
    onCancelAll
  } = props

  const notify = useToast()

  const uppy = useUppy(() => {
    return InitialUppy
  })

  useEffect(() => {
    const callBackFn = (file, response): void => {
      const mutateFile = (): UppyFile => {
        const mutatedProgress: UppyFile['progress'] = {
          bytesUploaded: file.size,
          bytesTotal: file.size,
          uploadStarted: Date.now(),
          uploadComplete: true,
          percentage: 100
        }

        return {
          ...file,
          progress: mutatedProgress
        }
      }
      onUploadSuccess?.(mutateFile(), response)
    }

    uppy.on('upload-success', callBackFn)

    return () => {
      uppy.off('upload-success', callBackFn)
    }
  }, [uppy])

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    const callBackFn = (file, progress): void => {
      const mutateFile = (): UppyFile => {
        const mutatedProgress: UppyFile['progress'] = {
          bytesUploaded: progress.bytesUploaded,
          bytesTotal: progress.bytesTotal,
          uploadStarted: Date.now(),
          uploadComplete: false,
          percentage: (progress.bytesUploaded / progress.bytesTotal) * 100
        }

        return {
          ...file,
          progress: mutatedProgress
        }
      }
      onUploadProgress?.(mutateFile(), progress)
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

  useEffect(() => {
    const callBackFn = (file, reason): void => {
      onFileRemoved?.(file, reason)
    }

    uppy.on('file-removed', callBackFn)
    return () => {
      uppy.off('file-removed', callBackFn)
    }
  }, [uppy])

  useEffect(() => {
    const callBackFn = (file, error, response): void => {
      onUploadError?.(file, error, response)
    }

    uppy.on('upload-error', callBackFn)
    return () => {
      uppy.off('upload-error', callBackFn)
    }
  }, [uppy])

  useEffect(() => {
    const callBackFn = (fileId): void => {
      onUploadRetry?.(fileId)
    }

    uppy.on('upload-retry', callBackFn)
    return () => {
      uppy.off('upload-retry', callBackFn)
    }
  }, [uppy])

  useEffect(() => {
    const callBackFn = (): void => {
      onCancelAll?.()
    }

    uppy.on('cancel-all', callBackFn)
    return () => {
      uppy.off('cancel-all', callBackFn)
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
