/**
 * @flow
 */
import { Suspense, useCallback, useEffect, useState } from 'react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import SearchCharacters from './SearchCharacters/SearchCharacters'

type Props = {
  search?: string,
  selected: Array<string>,
  onSelect: () => void,
}

export default function RootSearchCategories ({ search, onSelect, selected }: Props): Node {
  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: {
      name: null
    }
  })

  const refetch = useCallback(search => {
    setQueryArgs(prev => ({
      options: {
        fetchKey: (prev?.options?.fetchKey ?? 0) + 1
      },
      variables: {
        name: search || null
      }
    }))
  }, [])

  useEffect(() => {
    refetch(search)
  }, [search])

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <ErrorFallback error={error} reset={reset} refetch={refetch} />
        )}
      >
        <SearchCharacters selected={selected} onSelect={onSelect} queryArgs={queryArgs} />
      </ErrorBoundary>
    </Suspense>
  )
}
