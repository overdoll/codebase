interface State {
  value: string | number | Date | boolean | null
}

interface Action {
  type: string
  value: any | null
}

interface SingleStringValueProps {
  dispatchType: string
  defaultValue?: State
}

export type SingleStringValueReturn = [(state: State, action: Action) => State, State]

export default function singleStringValueReducer ({
  dispatchType,
  defaultValue
}: SingleStringValueProps): SingleStringValueReturn {
  const initialState: State = defaultValue != null ? defaultValue : { value: null }

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case (dispatchType): {
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
