import { UseSearchQueryState } from '../../Search/types'
import { useState } from 'react'
import { FetchPolicy } from 'relay-runtime'

export interface LazyArgumentsProps<TArguments> {
  lazyArguments: UseSearchQueryState<TArguments>
}

interface UseLazyArgumentsProps<TArguments> {
  fetchKey?: string | number
  defaultValue: TArguments
}

interface UseLazyArgumentsReturn<TArguments> {
  lazyArguments: UseSearchQueryState<TArguments>
  loadQuery: () => void
}

function useLazyArguments<TArguments extends Record<string, any> = Record<string, any>> (props: UseLazyArgumentsProps<TArguments>): UseLazyArgumentsReturn<TArguments> {
  const {
    defaultValue,
    fetchKey
  } = props

  const [forceLoad, setForceLoad] = useState(false)

  const queryState = {
    options: {
      fetchKey: fetchKey,
      fetchPolicy: forceLoad ? 'network-only' : 'store-or-network' as FetchPolicy
    },
    variables: defaultValue
  }

  const loadQuery = (): void => {
    setForceLoad(x => !x)
  }

  return {
    lazyArguments: queryState,
    loadQuery
  }
}

export default useLazyArguments
