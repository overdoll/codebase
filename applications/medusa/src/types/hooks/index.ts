import { UseQueryLoaderLoadQueryOptions } from 'react-relay'

export interface QueryArgumentsVariables {
  [variable: string]: any
}

export type LoadQueryType<T> = (variables: T, options?: (UseQueryLoaderLoadQueryOptions | undefined)) => void
