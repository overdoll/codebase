/**
 * @flow
 */

import type { Dispatch, State } from '@//:types/upload'
import UppyInstance from './uppy/Uppy'
import type { Uppy } from '@uppy/core'
import { EVENTS, STEPS } from '../constants/constants'
import { useEffect, useRef } from 'react'
import db from '../storage'
import dataURItoBlob from '@uppy/utils/lib/dataURItoBlob'

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
        db.transaction('rw', ...db.tables, async () => {
          db.tables.forEach(table => table.clear())
        })
        uppy.current?.reset()
      }
    }
  }, [state.step])

  // load state from indexeddb on mount
  // TODO: on hot reload this will re-run this hook - if fixing its recommended to add a return temporarily
  useEffect(() => {
    db.table('step')
      .get(1)
      .then(item => {
        if (item === undefined) {
          return
        }
        // set the step that the user was previously on
        dispatch({ type: EVENTS.STEP, value: item.step })
      })

    db.table('artist')
      .get(1)
      .then(item => {
        if (item === undefined) {
          return
        }
        // set the step that the user was previously on
        dispatch({ type: EVENTS.TAG_ARTIST, value: item.artist })
      })

    db.table('files')
      .toArray()
      .then(files => {
        files
          .sort((a, b) => a - b)
          .forEach(file => {
            dispatch({
              type: EVENTS.FILES,
              value: {
                id: file.id
              }
            })
          })
      })

    db.table('thumbnails')
      .toArray()
      .then(thumbnails => {
        thumbnails.forEach(thumbnail => {
          dispatch({
            type: EVENTS.THUMBNAILS,
            value: {
              [thumbnail.id]: URL.createObjectURL(
                dataURItoBlob(thumbnail.value, {})
              )
            }
          })
        })
      })

    db.table('urls')
      .toArray()
      .then(urls => {
        urls.forEach(url => {
          dispatch({
            type: EVENTS.URLS,
            value: { [url.id]: url.value }
          })
        })
      })

    db.table('progress')
      .toArray()
      .then(progress => {
        progress.forEach(progress => {
          dispatch({
            type: EVENTS.PROGRESS,
            value: { [progress.id]: progress.value }
          })
        })
      })

    db.table('characters')
      .toArray()
      .then(characters => {
        characters.forEach(characters => {
          dispatch({
            type: EVENTS.TAG_CHARACTERS,
            value: characters
          })
        })
      })

    db.table('categories')
      .toArray()
      .then(categories => {
        categories.forEach(category => {
          dispatch({
            type: EVENTS.TAG_CATEGORIES,
            value: category
          })
        })
      })
  }, [])

  return uppy.current
}

export default useUpload
