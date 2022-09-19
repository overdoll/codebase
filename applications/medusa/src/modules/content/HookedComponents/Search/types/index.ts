// Generics

import { FetchPolicy } from 'relay-runtime'

export type RegisterSearchKey = string
export type RegisterSearchValue = any

export type SearchValues = Record<string, any>

export declare type SearchAnyValues = Record<string, any>

export interface UseSearchQueryOptions {
  options: {
    fetchKey?: number | string
    fetchPolicy?: FetchPolicy | undefined
  }
}

export interface UseSearchQueryState<TArguments> extends UseSearchQueryOptions {
  variables: TArguments
}

export interface ComponentSearchArguments<T> {
  searchArguments: UseSearchQueryState<T>
}

// register function
type OnChangeRegister = (value: RegisterSearchValue) => void

export type RegisterMethod = 'change' | 'set'

export interface RegisterFunctionReturn {
  id: RegisterSearchKey
  isPending: boolean
  onChangeRegister: OnChangeRegister
  defaultValue?: string | null
}

export type RegisterFunction = (key: RegisterSearchKey, method: RegisterMethod) => RegisterFunctionReturn

// useChoice Hook
export declare type UseSearchProps<TArguments> = Partial<{
  defaultValue?: TArguments
  onChange?: (args: UseSearchQueryState<TArguments>) => void
}>

export interface UseSearchReturn<TArguments> extends ComponentSearchArguments<TArguments> {
  register: RegisterFunction
  changeArguments: (args: TArguments) => void
  setArguments: (args: TArguments) => void
  loadQuery: () => void
}
