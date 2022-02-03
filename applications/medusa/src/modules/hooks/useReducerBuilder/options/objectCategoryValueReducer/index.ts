import { MultiSelectedValue } from '../../../../content/ContentSelection'

export interface ObjectCategoryState {
  value: MultiSelectedValue
}

interface Action {
  type: string
  value: any | null
}

interface ObjectCategoryValueProps {
  dispatchType: string
  defaultValue?: ObjectCategoryState
}

export type ObjectCategoryValueReturn = [(state: ObjectCategoryState, action: Action) => ObjectCategoryState, ObjectCategoryState]

export default function objectCategoryValueReducer ({
  dispatchType,
  defaultValue
}: ObjectCategoryValueProps): ObjectCategoryValueReturn {
  const initialState: ObjectCategoryState = defaultValue != null ? defaultValue : { value: {} }

  const reducer = (state: ObjectCategoryState, action: Action): ObjectCategoryState => {
    switch (action.type) {
      case (dispatchType): {
        if (action.value == null) {
          return {
            ...state,
            value: {}
          }
        }

        return {
          ...state,
          value: action.value
        }
      }
    }
    return state
  }

  return [reducer, initialState]
}
