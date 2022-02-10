import { Dispatch, Reducer, useReducer } from 'react'
import { SingleStringValueReturn } from './options/singleStringValueReducer'
import { ObjectCategoryValueReturn } from './options/objectCategoryValueReducer'
import { ArrayValueReturn } from './options/arrayValueReducer'
import { UploadObjectsReturn } from './options/uploadObjectsReducer'

interface Props {
  [key: string]: SingleStringValueReturn | ObjectCategoryValueReturn | ArrayValueReturn | UploadObjectsReturn
}

export interface State {
  [key: string]: {
    [key: string]: any
  }
}

export type DispatchFunction = Dispatch<Action>

interface Action {
  type: string
  value: any | null
  remove?: boolean
}

export default function useReducerBuilder (reducers: Props): [State, DispatchFunction] {
  const reducerKeys = Object.keys(reducers)
  const reducerValues = Object.values(reducers)

  const globalState = reducerValues.reduce((accum, item, index) => ({
    ...accum,
    [reducerKeys[index]]: item[1]
  }), {})

  const combinedReducers = (state, action): State =>
    reducerValues.reduce(
      (accum, value, index) => ({
        ...accum,
        [reducerKeys[index]]: value[0](state[reducerKeys[index]], action)
      }),
      state
    )

  const rootReducer = (state, action): State => {
    if (action.type === 'initial_state') {
      return globalState
    }

    return combinedReducers(state, action)
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    rootReducer,
    globalState,
    undefined
  )

  return [state, dispatch]
}
