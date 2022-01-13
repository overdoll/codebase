import type { Action, State } from '@//:types/upload'
import { EVENTS, INITIAL_STATE, STEPS } from '../constants/constants'

// reducer maintains the whole state of the upload form
const reducer = (state: State, action: Action): State => {
  const act: string = action.type

  const copy = { ...state[act] }

  switch (action.type) {
    case EVENTS.URLS:
    case EVENTS.PROGRESS: {
      const id: string = Object.keys(action.value)[0]

      if (action.remove === true) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete copy[id]

        return {
          ...state,
          [act]: copy
        }
      }

      return {
        ...state,
        [act]: {
          ...copy,
          [id]: action.value[id]
        }
      }
    }
    case EVENTS.CHARACTERS:
    case EVENTS.CATEGORIES: {
      const id: string = action.value.id

      if (action.remove === true) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete copy[id]

        return {
          ...state,
          [act]: copy
        }
      }
      if (action.clear === true) {
        return {
          ...state,
          [act]: {}
        }
      }

      return {
        ...state,
        [act]: {
          ...copy,
          [id]: action.value
        }
      }
    }
    case EVENTS.CONTENT: {
      return {
        ...state,
        [act]: action.value
      }
    }
    case EVENTS.AUDIENCE: {
      if (action.remove === true) {
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
      return {
        ...state,
        [act]: true
      }
    }
    case EVENTS.FILES: {
      let files = [...state.files]

      if (action.remove === true) {
        const id: string = action.value.id

        files = files.filter(file => file.id !== id)

        return {
          ...state,
          [act]: files
        }
      }

      return {
        ...state,
        [act]: [...files, action.value]
      }
    }
    case EVENTS.STEP:

      // going back to first step - clear all data
      if (EVENTS.STEP === null) {
        return {
          ...state,
          step: STEPS.ARRANGE
        }
      }

      return {
        ...state,
        step: action.value
      }
    case EVENTS.CLEANUP:
      return INITIAL_STATE

    default:
      return state
  }
}

export default reducer
