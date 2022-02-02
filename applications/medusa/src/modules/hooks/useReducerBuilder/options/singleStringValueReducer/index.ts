interface State {
  value: string | number | Date | null
}

interface Action {
  type: string
  value: any | null
}

interface SingleStringValueProps {
  dispatchType: string
  initialValue?: State
}

export type SingleStringValueReturn = [(state: State, action: Action) => State, State]

export default function singleStringValueReducer ({
  dispatchType,
  initialValue
}: SingleStringValueProps): SingleStringValueReturn {
  const initialState: State = initialValue != null ? initialValue : { value: null }

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
