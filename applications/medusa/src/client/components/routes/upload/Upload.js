/**
 * @flow
 */
import type { Node } from 'react';
import { useEffect, useReducer } from 'react';
import { useUppy } from '@uppy/react';
import Uppy from './components/uppy/Uppy';
import { useNotify } from '@//:modules/focus';
import Stepper from './components/steps/Stepper';

type Props = {};

const events = {
  THUMBNAILS: 'THUMBNAILS',
  URLS: 'URLS',
  FILES: 'FILES',
  STEP: 'STEP',
  PROGRESS: 'PROGRESS',
};

const steps = {
  REVIEW: 'REVIEW',
  ARRANGE: 'ARRANGE',
  FINISH: 'FINISH',
  TAG: 'TAG',
};

const reducer = (state, action) => {
  switch (action.type) {
    case events.THUMBNAILS:
      return { ...state, thumbnails: action.value };
    case events.URLS:
      return { ...state, urls: action.value };
    case events.FILES:
      return { ...state, files: action.value };
    case events.STEP:
      return { ...state, step: action.value };
    case events.PROGRESS:
      return { ...state, progress: action.value };
    case 'ALL':
      return action.value;
    default:
      return state;
  }
};

const initialState = {
  thumbnails: {},
  files: [],
  urls: {},
  step: null,
  progress: {},
};

export default function Upload(props: Props): Node {
  const uppy = useUppy(() => {
    return Uppy;
  });

  const notify = useNotify();

  const [state, dispatch] = useReducer(reducer, initialState);

  // Create thumbnails
  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work)
  useEffect(() => {
    let thumbnailsQueue = {};

    uppy.on('thumbnail:generated', (file, preview) => {
      thumbnailsQueue = {
        ...thumbnailsQueue,
        [file.id]: preview,
      };

      dispatch({
        type: events.THUMBNAILS,
        value: thumbnailsQueue,
      });
    });

    let urlQueue = {};

    // On upload success, we update so that we have URLs, and we update the thumbnail to the new URL as well
    uppy.on('upload-success', (file, response) => {
      urlQueue = {
        ...urlQueue,
        [file.id]: response.uploadURL,
      };

      dispatch({
        type: events.URLS,
        value: urlQueue,
      });
    });
  }, []);

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    let progressQueue = {};
    uppy.on('upload-progress', (file, progress) => {
      progressQueue = {
        ...progressQueue,
        [file.id]: { '0': progress.bytesUploaded, '1': progress.bytesTotal },
      };

      dispatch({
        type: events.PROGRESS,
        value: progressQueue,
      });
    });
  }, []);

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

  // Cleanup - reset uppy uploads and state
  const onCancel = () => {
    uppy.reset();
    dispatch({ type: 'ALL', value: initialState });
  };

  const NextStep = () => {
    switch (state.step) {
      case steps.ARRANGE:
        dispatch({ type: events.STEP, value: steps.TAG });
        break;
      case steps.TAG:
        dispatch({ type: events.STEP, value: steps.REVIEW });
        break;
      default:
        break;
    }
  };

  const PrevStep = () => {
    switch (state.step) {
      case steps.TAG:
        dispatch({ type: events.STEP, value: steps.ARRANGE });
        break;
      case steps.REVIEW:
        dispatch({ type: events.STEP, value: steps.TAG });
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <>
      <Stepper uppy={uppy} state={state} dispatch={dispatch} />
      {state.step !== null && (
        <>
          {state.step && state.step !== steps.ARRANGE && (
            <button onClick={PrevStep}>prev</button>
          )}
          {state.step === steps.ARRANGE && (
            <button onClick={onCancel}>cancel</button>
          )}
          {state.step !== steps.REVIEW ? (
            <button onClick={NextStep}>next</button>
          ) : (
            <button
              onClick={onSubmit}
              // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
              disabled={state.files.length !== Object.keys(state.urls).length}
            >
              submit
            </button>
          )}
        </>
      )}
    </>
  );
}

export { events, steps };
