/**
 * @flow
 */

import type { Dispatch, State } from '@//:types/upload';
import UppyInstance from './uppy/Uppy';
import type { Uppy } from '@uppy/core';
import { STEPS } from '../constants/constants';
import { useEffect, useRef } from 'react';

// useUpload hook - when the component is unmounted, we want to clean up Uppy & IndexedDB, but
// we only want to do this if we were on the "finish" step
// If we are on anything else, we consider the upload flow to be "incomplete" and users can
// keep their progress if they come back to this page
const useUpload = (state: State, dispatch: Dispatch): Uppy => {
  const uppy = useRef<Uppy>(undefined)
  if (uppy.current === undefined) {
    uppy.current = UppyInstance
  }

  useEffect(() => {
    return () => {
      if (state.step === STEPS.FINISH && uppy.current) {
        uppy.current?.reset()
      }
    }
  }, [state.step])

  return [uppy.current]
}

export default useUpload
