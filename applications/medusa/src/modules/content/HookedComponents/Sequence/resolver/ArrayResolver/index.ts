import { ResolverFunction } from '../../types'

export default function ArrayResolver (): ResolverFunction<any[]> {
  return (sequenceState, sequenceAction): any[] => {
    switch (sequenceAction.transform) {
      case 'SET': {
        return sequenceAction.value
      }
      case 'ADD': {
        // prevent duplicates in array
        // if type is object, compare by "id" value
        // if type is non object, compare by the value itself
        const arraySet = new Set(sequenceState)
        sequenceAction.value.forEach((item) => arraySet.add(item))
        console.log(arraySet)
        const filteredState = sequenceState.filter((item) => (sequenceAction.value.includes(item)))
        console.log(filteredState)
        return [...sequenceState, ...sequenceAction.value]
      }
      case 'REMOVE': {
        return sequenceAction.value.filter((item) => sequenceState.includes(item))
      }
    }
    return sequenceState
  }
}
