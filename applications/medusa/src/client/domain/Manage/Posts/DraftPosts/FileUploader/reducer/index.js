/**
 * @flow
 */
import type { Action, State } from '@//:types/upload'
import { EVENTS, INITIAL_STATE, STEPS } from '../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'

// TODO remove reducer completely
// TODO for adding a category, do optimistic update so everything is in store and the query runs in the background

// reducer maintains the whole state of the upload form so that we can
// easily update our indexeddb state in the case of a crash
const reducer: {} = (state: State, action: Action): State => {
  const act: string = action.type

  const copy = { ...state[act] }

  switch (action.type) {
    case EVENTS.THUMBNAILS: {
      const id: string = Object.keys(action.value)[0]

      if (action.remove) {
        // delete item from database
        // db.table(act).delete(id)

        delete copy[id]

        return { ...state, [act]: copy }
      }

      const url = action.value[id]

      fetch(url)
        .then(response => response.blob())
        .then(async blob => {
          const result = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })

          /*

          // add thumbnail to database && convert blob url to data string so it can be saved in indexedDB and read later
          db.transaction('rw', db.table('thumbnails'), async () => {
            db.table(act).put({ id, value: result })
          })
           */
        })

      return { ...state, [act]: { ...copy, [id]: url } }
    }
    case EVENTS.URLS:
    case EVENTS.PROGRESS: {
      const id: string = Object.keys(action.value)[0]

      if (action.remove) {
        // delete item from database
        // db.table(act).delete(id)

        delete copy[id]

        return { ...state, [act]: copy }
      }

      // add item to database
      /*
      db.table(act).put({ id, value: action.value[id] })
       */

      return { ...state, [act]: { ...copy, [id]: action.value[id] } }
    }
    case EVENTS.TAG_CHARACTERS:
    case EVENTS.TAG_CATEGORIES: {
      const id: string = action.value.id

      if (action.remove) {
        // delete item from database
        /*
        db.table(act).delete(id)
         */

        delete copy[id]

        return { ...state, [act]: copy }
      }

      // add item to database
      /*
      db.table(act).put(action.value)
       */

      return { ...state, [act]: { ...copy, [id]: action.value } }
    }
    case EVENTS.ARRANGE_FILES: {
      // when we arrange files, we need to clear the whole database since we update the order
      /*
      db.transaction('rw', db.files, async () => {
        db.table('files').clear()
        db.table('files').bulkPut(
          action.value.map((file, index) => ({
            id: file.id,
            type: file.type,
            index
          }))
        )
      })
       */
      return {
        ...state,
        files: action.value
      }
    }
    case EVENTS.FILES: {
      let files = [...state.files]

      if (action.remove) {
        const id: string = action.value.id

        // delete item from database
        // db.table(act).delete(id)

        files = files.filter(file => file.id !== id)

        return { ...state, [act]: files }
      }

      // add item to database
      /*
      db.table(act).put({ id: action.value.id, type: action.value.type, index: files.length + 1 })
       */
      return {
        ...state,
        [act]: [...files, action.value]
      }
    }

    case EVENTS.TAG_ARTIST:
      // db.table('artist').put({ id: 1, artist: action.value })
      return { ...state, artist: action.value }
    case EVENTS.STEP:
      // going back to first step - clear all data
      if (EVENTS.STEP === null) {
        /*
        db.transaction('rw', ...db.tables, async () => {
          db.tables.forEach(table => table.clear())

        })
        */

        return { ...state, step: null }
      }

      // db.table('step').put({ id: 1, step: action.value })
      return { ...state, step: action.value }
    case EVENTS.CLEANUP:
      /*
      db.transaction('rw', ...db.tables, async () => {
        db.tables.forEach(table => table.clear())
      })
       */

      return INITIAL_STATE
    case EVENTS.SUBMIT:
      /*
      db.transaction('rw', ...db.tables, async () => {
        db.tables.forEach(table => table.clear())
      })
       */
      return { ...state, submit: action.value, step: STEPS.FINISH }
    default:
      return state
  }
}

export default reducer
