/**
 * @flow
 */

import type { Dispatch, State } from '@//:types/upload';
import Uppy from './uppy/Uppy';
import { EVENTS, STEPS } from '../constants/constants';
import { useEffect, useRef } from 'react';
import db from '../storage';

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
        db.clear();
        db.close();
        uppy.current?.close();
      }
    };
  }, [state.step]);

  // load state from indexeddb on mount
  // TODO: on hot reload this will re-run this hook - need to stop that from happening
  useEffect(() => {
    db.table('step')
      .get(1)
      .then(item => {
        if (item === undefined) {
          return;
        }
        // set the step that the user was previously on
        dispatch({ type: EVENTS.STEP, value: item.step });
      });

    db.table('artist')
      .get(1)
      .then(item => {
        if (item === undefined) {
          return;
        }
        // set the step that the user was previously on
        dispatch({ type: EVENTS.TAG_ARTIST, value: item.artist });
      });

    db.table('files')
      .toArray()
      .then(files => {
        files
          .sort((a, b) => a - b)
          .forEach(file => {
            dispatch({
              type: EVENTS.FILES,
              value: {
                id: file.id,
              },
            });
          });
      });

    db.table('thumbnails')
      .toArray()
      .then(thumbnails => {
        thumbnails.forEach(thumbnail => {
          dispatch({
            type: EVENTS.THUMBNAILS,
            value: { [thumbnail.id]: thumbnail.value },
          });
        });
      });

    db.table('urls')
      .toArray()
      .then(urls => {
        urls.forEach(url => {
          dispatch({
            type: EVENTS.URLS,
            value: { [url.id]: url.value },
          });
        });
      });

    db.table('progress')
      .toArray()
      .then(progress => {
        progress.forEach(progress => {
          dispatch({
            type: EVENTS.PROGRESS,
            value: { [progress.id]: progress.value },
          });
        });
      });

    db.table('characters')
      .toArray()
      .then(characters => {
        characters.forEach(characters => {
          dispatch({
            type: EVENTS.TAG_CHARACTERS,
            value: characters,
          });
        });
      });

    db.table('categories')
      .toArray()
      .then(categories => {
        categories.forEach(category => {
          dispatch({
            type: EVENTS.TAG_CATEGORIES,
            value: category,
          });
        });
      });
  }, []);

  return uppy.current;
};

export default useUpload;
