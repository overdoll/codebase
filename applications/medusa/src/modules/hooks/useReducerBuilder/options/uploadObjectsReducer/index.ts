import { MultiSelectedValue } from '../../../../content/ContentSelection'
import { removeKeyFromObject } from '../../../../support'
import { UppyFile } from '@uppy/core'

export interface UploadObjectsState {
  progress: MultiSelectedValue
  files: UppyFile[]
  urls: MultiSelectedValue
}

interface Action {
  type: string
  value: any | null
  remove?: boolean
}

interface UploadObjectsProps {
  dispatchType: string
  defaultValue?: UploadObjectsState
}

export type UploadObjectsReturn = [(state: UploadObjectsState, action: Action) => UploadObjectsState, UploadObjectsState]

export default function uploadObjectsReducer ({
  dispatchType,
  defaultValue
}: UploadObjectsProps): UploadObjectsReturn {
  const initialState: UploadObjectsState = defaultValue != null
    ? defaultValue
    : {
        urls: {},
        progress: {},
        files: []
      }

  const reducer = (state: UploadObjectsState, action: Action): UploadObjectsState => {
    switch (action.type) {
      case (`${dispatchType}_clear`): {
        return {
          ...state,
          urls: {},
          progress: {},
          files: []
        }
      }
      case (`${dispatchType}_urls`): {
        const id: string = Object.keys(action.value)[0]

        if (action.remove === true) {
          return {
            ...state,
            urls: removeKeyFromObject(id, state.urls)
          }
        }

        return {
          ...state,
          urls: {
            ...state.urls,
            [id]: action.value[id]
          }
        }
      }
      case (`${dispatchType}_progress`): {
        const id: string = Object.keys(action.value)[0]

        if (action.remove === true) {
          return {
            ...state,
            progress: removeKeyFromObject(id, state.progress)
          }
        }

        return {
          ...state,
          progress: {
            ...state.progress,
            [id]: action.value[id]
          }
        }
      }
      case (`${dispatchType}_files`): {
        const files = [...state.files]

        if (action.remove === true) {
          const id: string = action.value.id

          const newFiles = files.filter(file => file.id !== id)

          return {
            ...state,
            files: newFiles
          }
        }

        return {
          ...state,
          files: [...files, action.value]
        }
      }
    }
    return state
  }

  return [reducer, initialState]
}
