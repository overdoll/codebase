import type { Uppy as UppyInitialType } from '@uppy/core'
import { State, Uppy, UppyFile } from '@uppy/core'

export type UppyType = Omit<State, 'currentUploads' | 'files' | 'totalProgress'> & Uppy

export type OnFileAddedType = (file: UppyFile) => void
export type OnUploadSuccessType = (file: UppyFile, response) => void
export type OnUploadProgressType = (file: UppyFile, progress: UppyFile['progress']) => void
export type OnFileRemovedType = (file: UppyFile, reason) => void
export type OnUploadErrorType = (file: UppyFile, error, response) => void
export type OnUploadRetryType = (fileId: UppyFile['id']) => void

export interface UseUploadProps {
  uppy: UppyInitialType
  onFileAdded?: OnFileAddedType
  onUploadSuccess?: OnUploadSuccessType
  onUploadProgress?: OnUploadProgressType
  onFileRemoved?: OnFileRemovedType
  onUploadError?: OnUploadErrorType
  onUploadRetry?: OnUploadRetryType
}

export type UseUploadReturnType = UppyType

interface UppyError {
  message: string | null
  stack: string | null
  originalRequest: Record<string, any> | null
  originalResponse: Record<string, any> | null
  causingError: null | string
}

export interface FileErrorType {
  error?: UppyError
  response?: string
}
