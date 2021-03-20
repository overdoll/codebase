/**
 * @flow
 */

import type { Dispatch, State } from '@//:types/upload';
import Uppy from './uppy/Uppy';
import { STEPS } from '../constants/constants';
import { useEffect, useRef } from 'react';

// useUpload hook - when the component is unmounted, we want to clean up Uppy & IndexedDB, but
// we only want to do this if we were on the "finish" step
// If we are on anything else, we consider the upload flow to be "incomplete" and users can
// keep their progress if they come back to this page
const useUpload = (state: State, dispatch: Dispatch): any => {
  const uppy = useRef(undefined);
  if (uppy.current === undefined) {
    uppy.current = Uppy;
  }

  useEffect(() => {
    return () => {
      if (state.step === STEPS.FINISH && uppy.current) {
        // TODO: clear indexeddb state here
        uppy.current.close();
      }
    };
  }, [state.step]);

  // TODO: reinstate indexedDB state here on mount
  useEffect(() => {
    console.log(uppy.current?.getFiles());
  }, []);

  return uppy.current;
};

export default useUpload;
