interface ArrayValueState {
  value: string[]
}

interface Action {
  type: string
  value: any | null
}

interface ArrayValueProps {
  dispatchType: string
  defaultValue?: ArrayValueState
}

export type ArrayValueReturn = [(state: ArrayValueState, action: Action) => ArrayValueState, ArrayValueState]

export default function arrayValueReducer ({
  dispatchType,
  defaultValue
}: ArrayValueProps): ArrayValueReturn {
  const initialState: ArrayValueState = defaultValue != null ? defaultValue : { value: [] }

  const reducer = (state: ArrayValueState, action: Action): ArrayValueState => {
    switch (action.type) {
      case (dispatchType): {
        if (action.value == null) {
          return {
            ...state,
            value: []
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
