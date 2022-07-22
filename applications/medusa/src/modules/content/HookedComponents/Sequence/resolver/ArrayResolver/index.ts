import { ResolverFunction } from '../../types'

export default function ArrayResolver (): ResolverFunction<any[]> {
  return (sequenceState, sequenceAction): any[] => {
    switch (sequenceAction.transform) {
      case 'SET': {
        return sequenceAction.value
      }
      case 'ADD': {
        const arraySet = new Set(sequenceState)
        sequenceAction.value.forEach((item) => arraySet.add(item))
        return [...sequenceState, ...sequenceAction.value]
      }
      case 'REMOVE': {
        return sequenceAction.value.filter((item) => sequenceState.includes(item))
      }
    }
    return sequenceState
  }
}
