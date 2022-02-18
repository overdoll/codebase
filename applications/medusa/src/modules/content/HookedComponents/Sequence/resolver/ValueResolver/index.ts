import { ResolverFunction } from '../../types'

export default function ValueResolver<TResolver> (): ResolverFunction<TResolver> {
  return (sequenceState, sequenceAction): TResolver => {
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
