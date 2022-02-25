import {
  RegisterFunctionReturn,
  RegisterMethod,
  RegisterSearchKey,
  RegisterSearchValue,
  SearchValues,
  UseSearchProps,
  UseSearchQueryOptions,
  UseSearchQueryState,
  UseSearchReturn
} from '../../types'
import { useCallback, useState, useTransition } from 'react'
import { FetchPolicy } from 'relay-runtime'

function useSearch<TArguments extends SearchValues> (props: UseSearchProps<TArguments>): UseSearchReturn<TArguments> {
  const {
    defaultValue = {}
  } = props

  const queryState = {
    options: {
      fetchKey: 0,
      fetchPolicy: 'network-only' as FetchPolicy
    },
    variables: defaultValue
  }

  // @ts-expect-error
  const [searchArgs, setSearchArgs] = useState<UseSearchQueryState<TArguments>>(queryState)

  // @ts-expect-error
  const [isPending, startTransition] = useTransition({
    timeoutMs: 2000
  })

  const incrementFetchKey = (previous: number): UseSearchQueryOptions => ({
    options: {
      fetchKey: previous + 1,
      fetchPolicy: 'network-only'
    }
  })

  // Keep the previous variables as to not interrupt the query
  const replaceOrCreateQueryArguments = (previous, args): UseSearchQueryState<TArguments> => ({
    ...incrementFetchKey(previous.options.fetchKey),
    variables: {
      ...previous.variables, ...args
    }
  })

  // Replace all variables regardless of whether it will interrupt the query
  const replaceQueryArguments = (previous, args): UseSearchQueryState<TArguments> => ({
    ...incrementFetchKey(previous.options.fetchKey),
    variables: args
  })

  // One of the replace functions but as a callback and with a transition
  const changeArguments = useCallback((args) => {
    startTransition(() => {
      setSearchArgs(prev => replaceOrCreateQueryArguments(prev, args))
    })
  }, [])

  const setArguments = useCallback((args) => {
    startTransition(() => {
      setSearchArgs(prev => replaceQueryArguments(prev, args))
    })
  }, [])

  const loadQuery = useCallback(() => {
    startTransition(() => {
      setSearchArgs(prev => replaceOrCreateQueryArguments(prev, {}))
    })
  }, [])

  // register a search component or any other component that can change an argument
  const register = (key: RegisterSearchKey, method: RegisterMethod): RegisterFunctionReturn => {
    const onChangeRegister = (value: RegisterSearchValue): void => {
      if (method === 'set') {
        setArguments({ [key]: value })
      } else {
        changeArguments({ [key]: value })
      }
    }
    return {
      id: key,
      isPending,
      onChangeRegister
    }
  }

  return {
    register,
    searchArguments: searchArgs,
    changeArguments,
    setArguments,
    loadQuery
  }
}

export default useSearch
