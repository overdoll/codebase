import { Reducer, useCallback, useReducer } from 'react'
import { SequenceAction, SequenceRecords, SequenceResetAction, UseSequenceProps, UseSequenceReturn } from '../../types'

export default function useSequence<TState extends SequenceRecords> (props: UseSequenceProps<TState>): UseSequenceReturn<TState> {
  const {
    resolver,
    defaultValue
  } = props

  const sections = Object.keys(resolver)
  const resolvers = Object.values(resolver)

  const resolvedReducers = (sequenceState, sequenceAction): TState =>
    resolvers.reduce(
      (accum, func, index) => {
        return ({
          ...accum,
          [sections[index]]: sequenceAction.type === sections[index] ? func(sequenceState[sections[index]], sequenceAction) : sequenceState[sections[index]]
        })
      },
      sequenceState
    )

  const rootReducer = (sequenceState, sequenceAction): TState => {
    if (sequenceAction.type === 'initial_state') {
      switch (sequenceAction.transform) {
        case ('SET'):
          return sequenceAction.value
        default:
          return sequenceState
      }
    }

    return resolvedReducers(sequenceState, sequenceAction)
  }

  const memoFunction = useCallback((sequenceState, sequenceAction) => rootReducer(sequenceState, sequenceAction), [])

  const [state, dispatch] = useReducer<Reducer<TState, SequenceAction<TState> | SequenceResetAction<TState>>>(
    memoFunction,
    defaultValue,
    undefined
  )

  const reset = (): void => {
    dispatch({
      type: 'initial_state',
      value: defaultValue,
      transform: 'SET'
    })
  }

  return {
    state,
    dispatch,
    reset
  }
}
