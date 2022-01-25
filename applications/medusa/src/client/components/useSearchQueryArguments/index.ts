import { useCallback, useState } from 'react'
import { QueryArguments, QueryArgumentsVariables } from '@//:types/hooks'

export default function useSearchQueryArguments (initialVariables: QueryArgumentsVariables): [QueryArguments, (variables: QueryArgumentsVariables) => void] {
  const initialState = {
    options: { fetchKey: 0 },
    variables: {
      ...initialVariables
    }
  }

  const [queryArguments, setQueryArgumentsState] = useState<QueryArguments>(initialState)

  const setQueryArguments = useCallback((variables: QueryArgumentsVariables) => {
    const variablesObject: QueryArgumentsVariables = {}

    Object.keys(variables).forEach((item) => {
      switch (variables[item]) {
        case null:
          variablesObject[item] = null
          return
        case '':
          variablesObject[item] = null
          return
        default:
          variablesObject[item] = variables[item]
      }
    })

    setQueryArgumentsState(prev => ({
      options: {
        fetchKey: (prev?.options?.fetchKey ?? 0) + 1
      },
      variables: {
        ...variablesObject
      }
    }))
  }, [...Object.values(queryArguments.variables)])

  return [queryArguments, setQueryArguments]
}
