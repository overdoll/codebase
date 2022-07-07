import type { Uppy as UppyInitialType } from '@uppy/core'
import { State, Uppy, UppyFile } from '@uppy/core'

export type UppyType = Omit<State, 'currentUploads' | 'files' | 'totalProgress'> & Uppy

export type OnFileAddedType = (file: UppyFile) => void
export type OnUploadSuccessType = (file: UppyFile, response) => void
export type OnUploadProgressType = (file: UppyFile, response) => void
export type OnFileRemovedType = (file: UppyFile, reason) => void
export type OnUploadError = (file: UppyFile, error, response) => void
export type onUploadRetry = (fileId: UppyFile['id']) => void

export interface UseUploadProps {
  uppy: UppyInitialType
  onFileAdded?: OnFileAddedType
  onUploadSuccess?: OnUploadSuccessType
  onUploadProgress?: OnUploadProgressType
  onFileRemoved?: OnFileRemovedType
  onUploadError?: OnUploadError
  onUploadRetry?: onUploadRetry
}

export type UseUploadReturnType = UppyType
