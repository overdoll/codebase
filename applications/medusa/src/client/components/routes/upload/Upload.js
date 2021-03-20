/**
 * @flow
 */
import type { Node } from 'react';
import { useEffect, useReducer } from 'react';
import { useUppy } from '@uppy/react';
import Uppy from './components/uppy/Uppy';
import { useNotify } from '@//:modules/focus';
import Steps from './components/steps/Steps';
import type { Action, Dispatch, State } from '@//:types/upload';
import { EVENTS, INITIAL_STATE } from './constants/constants';
import reducer from './reducer';

// Main upload component - handles all events from Uppy and renders the stepper
// also contains the main state and is responsible for recovering state when rendered (if state is available)
export default function Upload(): Node {
  const uppy = useUppy(() => {
    return Uppy;
  });

  const notify = useNotify();

  const [state: State, dispatch: Dispatch] = useReducer<State, Action>(
    reducer,
    INITIAL_STATE,
  );

  // Add to thumbnails state when a new thumbnail is added
  useEffect(() => {
    uppy.on('thumbnail:generated', (file, preview) => {
      dispatch({
        type: EVENTS.THUMBNAILS,
        value: { [file.id]: preview },
      });
    });
  }, [uppy]);

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work, and you need to be logged in to see it)
  useEffect(() => {
    // On upload success, we update so that we have URLs, and we update the thumbnail to the new URL as well
    uppy.on('upload-success', (file, response) => {
      dispatch({
        type: EVENTS.URLS,
        value: { [file.id]: response.uploadURL },
      });
    });
  }, [uppy]);

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    uppy.on('upload-progress', (file, progress) => {
      dispatch({
        type: EVENTS.PROGRESS,
        value: {
          [file.id]: { '0': progress.bytesUploaded, '1': progress.bytesTotal },
        },
      });
    });
  }, [uppy]);

  // Events for errors
  useEffect(() => {
    uppy.on('upload-error', data => {
      notify.error('upload error');
    });

    uppy.on('restriction-failed', (file, error) => {
      notify.error('restriction failed');
    });

    uppy.on('info-visible', () => {
      const info = uppy.getState().info;

      const message = `${info.message} ${info.details}`;

      switch (info.type) {
        case 'error':
          notify.error(message);
          break;
        default:
          notify.warn(`${info.message} ${info.details}`);
          break;
      }
    });
  }, []);

  return <Steps uppy={uppy} state={state} dispatch={dispatch} />;
}
