/**
 * @flow
 */
import type { Node } from 'react';
import { useEffect, useReducer } from 'react';
import { useUppy } from '@uppy/react';
import Uppy from './components/uppy/Uppy';
import Begin from './components/steps/begin/Begin';
import Arrange from './components/steps/arrange/Arrange';
import { useNotify } from '@//:modules/focus';

type Props = {};

const events = {
  THUMBNAILS: 'THUMBNAILS',
  URLS: 'URLS',
  FILES: 'FILES',
  STEP: 'STEP',
  PROGRESS: 'PROGRESS',
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

  // Remove files based on ID
  useEffect(() => {
    uppy.on('file-removed', removed => {
      const newFiles = state.files.filter(file => file.id !== removed.id);
      dispatch({ type: events.FILES, value: newFiles });
    });

    // we will have 0 files - go back to previous step
    if (state.files.length === 0) {
      dispatch({ type: events.STEP, value: null });
    }
  }, [state.files]);

  // Create thumbnails
  useEffect(() => {
    let thumbnailsQueue = {};

    uppy.on('thumbnail:generated', (file, preview) => {
      thumbnailsQueue = {
        ...thumbnailsQueue,
        [file.id]: preview,
      };

      dispatch({ type: events.THUMBNAILS, value: thumbnailsQueue });
    });
  }, []);

  // Urls - when upload is complete we have semi-public urls (you need to know the URL for it to work)
  useEffect(() => {
    let urlQueue = {};

    uppy.on('upload-success', (file, response) => {
      urlQueue = {
        ...urlQueue,
        [file.id]: response.uploadURL,
      };

      dispatch({ type: events.URLS, value: urlQueue });
    });
  }, []);

  // Upload progress
  useEffect(() => {
    let progressQueue = {};
    uppy.on('upload-progress', (file, progress) => {
      progressQueue = {
        ...progressQueue,
        [file.id]: { '0': progress.bytesUploaded, '1': progress.bytesTotal },
      };

      dispatch({ type: events.PROGRESS, value: progressQueue });
    });
  }, [state.progress]);

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

  // Add files
  const onAddFiles = files => {
    if (state.step === null) {
      dispatch({ type: events.STEP, value: 'arrange' });
    }

    dispatch({ type: events.FILES, value: uppy.getFiles() });
  };

  const onRemoveFile = id => {
    uppy.removeFile(id);
  };

  const onArrangeFile = (file, pos) => {};

  switch (state.step) {
    case 'arrange':
      return (
        <Arrange
          uppy={uppy}
          onAddFiles={onAddFiles}
          onRemoveFile={onRemoveFile}
          files={state.files}
          thumbnails={state.thumbnails}
          progress={state.progress}
          onArrangeFile={onArrangeFile}
        />
      );
    default:
      return <Begin uppy={uppy} onAddFiles={onAddFiles} />;
  }
}
