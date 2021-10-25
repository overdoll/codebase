/**
 * @flow
 */
import type { Action, State } from '@//:types/upload'
import { EVENTS, INITIAL_STATE, STEPS } from '../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'

// TODO remove reducer part for non-uploads
// TODO for adding a category, do optimistic update so everything is in store and the query runs in the background

// reducer maintains the whole state of the upload form so that we can
// easily update our indexeddb state in the case of a crash
const reducer: {} = (state: State, action: Action): State => {
  const act: string = action.type

  const copy = { ...state[act] }

  switch (action.type) {
    case EVENTS.URLS:
    case EVENTS.PROGRESS: {
      const id: string = Object.keys(action.value)[0]

      if (action.remove) {
        delete copy[id]

        return { ...state, [act]: copy }
      }

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
    case EVENTS.CONTENT: {
      let content = state.content

      if (action.remove) {
        const url: string = action.value.url

        content = content.filter(file => file !== url)

        return { ...state, [act]: content }
      }

      return {
        ...state,
        [act]: [...action.value]
      }
    }
    case EVENTS.FILES: {
      let files = [...state.files]

      if (action.remove) {
        const id: string = action.value.id

        files = files.filter(file => file.id !== id)

        return { ...state, [act]: files }
      }

      return {
        ...state,
        [act]: [...files, action.value]
      }
    }
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
