/**
 * @flow
 */
import type { Action, State } from '@//:types/upload';
import { EVENTS, INITIAL_STATE, STEPS } from '../constants/constants';

// reducer maintains the whole state of the upload form
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
    case EVENTS.CHARACTERS:
    case EVENTS.CATEGORIES: {
      const id: string = action.value.id

      if (action.remove) {
        delete copy[id]

        return { ...state, [act]: copy }
      }
      if (action.clear) {
        return { ...state, [act]: {} }
      }

      return { ...state, [act]: { ...copy, [id]: action.value } }
    }
    case EVENTS.CONTENT: {
      let content = state.content

      if (action.remove) {
        const id: string = action.value

        content = content.filter(item => item.id !== id)

        return { ...state, [act]: content }
      }

      if (action.clear) {
        return { ...state, [act]: null }
      }

      return {
        ...state,
        [act]: [...action.value]
      }
    }
    case EVENTS.AUDIENCE: {
      if (action.remove) {
        return {
          ...state,
          [act]: null
        }
      }

      return {
        ...state,
        [act]: action.value
      }
    }
    case EVENTS.BRAND: {
      if (action.remove) {
        return {
          ...state,
          [act]: null
        }
      }

      return {
        ...state,
        [act]: action.value
      }
    }
    case EVENTS.IN_REVIEW: {
      return { ...state, [act]: true }
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
        return { ...state, step: STEPS.ARRANGE }
      }

      return { ...state, step: action.value }
    case EVENTS.CLEANUP:
      return INITIAL_STATE

    default:
      return state
  }
}

export default reducer