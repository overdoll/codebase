import {
  RegisterFunctionReturn,
  RegisterSearchKey,
  RegisterSearchValue,
  UseSearchProps,
  UseSearchQueryOptions,
  UseSearchQueryState,
  UseSearchReturn
} from '../../types'
import { useCallback, useState, useTransition } from 'react'
import { FetchPolicy } from 'relay-runtime'

type SearchProps = Record<string, any>

function useSearch<TArguments extends SearchProps = SearchProps> (props: UseSearchProps<TArguments>): UseSearchReturn<TArguments> {
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
  const replaceOrCreateQueryArguments = (previous: UseSearchQueryState<TArguments>, args: TArguments): UseSearchQueryState<TArguments> => ({
    ...incrementFetchKey(previous.options.fetchKey),
    variables: {
      ...previous.variables, ...args
    }
  })

  // Replace all variables regardless of whether it will interrupt the query
  const replaceQueryArguments = (previous: UseSearchQueryState<TArguments>, args: TArguments): UseSearchQueryState<TArguments> => ({
    ...incrementFetchKey(previous.options.fetchKey),
    variables: args
  })

  // One of the replace functions but as a callback and with a transition
  const changeArguments = useCallback((args: TArguments) => {
    startTransition(() => {
      setSearchArgs(prev => replaceOrCreateQueryArguments(prev, args))
    })
  }, [])

  const setArguments = useCallback((args: TArguments) => {
    startTransition(() => {
      setSearchArgs(prev => replaceQueryArguments(prev, args))
    })
  }, [])

  const loadQuery = useCallback(() => {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      setSearchArgs(prev => replaceOrCreateQueryArguments(prev, {} as TArguments))
    })
  }, [])

  // register a search component or any other component that can change an argument
  const register = (key: RegisterSearchKey): RegisterFunctionReturn => {
    const onChangeRegister = (value: RegisterSearchValue): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      changeArguments({ [key]: value } as TArguments)
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
