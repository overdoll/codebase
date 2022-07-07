import type { Uppy as UppyInitialType } from '@uppy/core'
import { State, Uppy, UppyFile } from '@uppy/core'

export type UppyType = Omit<State, 'currentUploads' | 'files' | 'totalProgress'> & Uppy

export type OnFileAddedType = (file: UppyFile) => void
export type OnUploadSuccessType = (file: UppyFile, response) => void
export type OnUploadProgressType = (file: UppyFile, response) => void

export interface UseUploadProps {
  uppy: UppyInitialType
  onFileAdded?: OnFileAddedType
  onUploadSuccess?: OnUploadSuccessType
  onUploadProgress?: OnUploadProgressType
}

export type UseUploadReturnType = UppyType
