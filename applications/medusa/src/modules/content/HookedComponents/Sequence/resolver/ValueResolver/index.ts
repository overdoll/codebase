import { ResolverFunction } from '../../types'

export default function ValueResolver (): ResolverFunction<any> {
  return (sequenceState, sequenceAction): any => {
    switch (sequenceAction.transform) {
      case 'SET': {
        return sequenceAction.value
      }
      case 'ADD': {
        return sequenceAction.value
      }
      case 'REMOVE': {
        return sequenceAction.value
      }
    }
    return sequenceState
  }
}
