import { ResolverFunction } from '../../types'

export default function ObjectResolver (): ResolverFunction<Record<string, any>> {
  return (sequenceState, sequenceAction): Record<string, any> => {
    switch (sequenceAction.transform) {
      case 'SET': {
        return sequenceAction.value
      }
      case 'ADD': {
        return { ...sequenceState, ...sequenceAction.value }
      }
      case 'REMOVE': {
        return Object.keys(sequenceState).reduce((accum, item, index) =>
          (sequenceAction.value[item] != null
            ? { ...accum }
            : {
                ...accum,
                [item]: sequenceState[item]
              }), {})
      }
    }
    return sequenceState
  }
}
