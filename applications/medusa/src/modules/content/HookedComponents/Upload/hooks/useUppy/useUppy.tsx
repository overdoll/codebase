import { useEffect, useRef } from 'react'
import type { Uppy as UppyType } from '@uppy/core'

const useUppy = (factory): UppyType => {
  if (typeof factory !== 'function') {
    throw new TypeError('useUppy: expected a function that returns a new Uppy instance')
  }

  const uppy = useRef<UppyType | null>(null)
  if (uppy.current == null) {
    uppy.current = factory()
  }

  useEffect(() => {
    return () => {
      uppy?.current?.reset()
    }
  }, [])

  return uppy.current as UppyType
}

export default useUppy
