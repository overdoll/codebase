import { useRef } from 'react'
import { Uppy } from '@uppy/core'
import UppyInstance from '../uppy/Uppy'

export default function useUpload (): Uppy {
  const initUppy = useRef<Uppy | undefined>(undefined)

  if (initUppy.current === undefined) {
    initUppy.current = UppyInstance
  }

  return initUppy.current
}
