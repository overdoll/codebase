/**
 * @flow
 */
import type { Node } from 'react';
import { useEffect, useReducer } from 'react';
import { useUppy } from '@uppy/react';
import Uppy from './components/uppy/Uppy';
import { useNotify } from '@//:modules/focus';
import Steps from './components/steps/Steps';
import type {
  Action,
  Dispatch,
  Progress,
  State,
  Thumbnails,
  Urls,
} from '@//:types/upload';
import { EVENTS, INITIAL_STATE } from './constants/constants';

// TODO: on each update, save state here in indexeddb, clean storage on SUBMIT
const reducer: any = (state: State, action: Action): State => {
  switch (action.type) {
    case EVENTS.THUMBNAILS:
      return { ...state, thumbnails: action.value };
    case EVENTS.URLS:
      return { ...state, urls: action.value };
    case EVENTS.FILES:
      return { ...state, files: action.value };
    case EVENTS.STEP:
      return { ...state, step: action.value };
    case EVENTS.PROGRESS:
      return { ...state, progress: action.value };
    case EVENTS.TAG_ARTIST:
      return { ...state, artist: action.value };
    case EVENTS.TAG_CHARACTERS:
      return { ...state, characters: action.value };
    case EVENTS.TAG_CATEGORIES:
      return { ...state, categories: action.value };
    case EVENTS.SUBMIT:
      return { ...state, submit: action.value };
    case EVENTS.ALL:
      return action.value;
    default:
      return state;
  }
};

// Main upload component - handles all events from Uppy and renders the stepper
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
    let thumbnailsQueue: Thumbnails = {};

    uppy.on('thumbnail:generated', (file, preview) => {
      thumbnailsQueue = {
        ...thumbnailsQueue,
        [file.id]: preview,
      };

      dispatch({
        type: EVENTS.THUMBNAILS,
        value: thumbnailsQueue,
      });
    });
  }, [uppy]);

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work, and you need to be logged in to see it)
  useEffect(() => {
    let urlQueue: Urls = {};

    // On upload success, we update so that we have URLs, and we update the thumbnail to the new URL as well
    uppy.on('upload-success', (file, response) => {
      urlQueue = {
        ...urlQueue,
        [file.id]: response.uploadURL,
      };

      dispatch({
        type: EVENTS.URLS,
        value: urlQueue,
      });
    });
  }, [uppy]);

  // Upload progress - when a file reports progress, update state so user can see
  useEffect(() => {
    let progressQueue: Progress = {};
    uppy.on('upload-progress', (file, progress) => {
      progressQueue = {
        ...progressQueue,
        [file.id]: { '0': progress.bytesUploaded, '1': progress.bytesTotal },
      };

      dispatch({
        type: EVENTS.PROGRESS,
        value: progressQueue,
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
