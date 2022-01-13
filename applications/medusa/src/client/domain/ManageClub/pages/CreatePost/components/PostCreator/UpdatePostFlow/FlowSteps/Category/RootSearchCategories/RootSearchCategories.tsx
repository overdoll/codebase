import { Suspense, useCallback, useEffect, useState } from 'react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import SearchCategories from './SearchCategories/SearchCategories'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

interface Props {
  search?: string
  selected: string[]
  onSelect: (category: any) => void
}

export default function RootSearchCategories ({
  search,
  onSelect,
  selected
}: Props): JSX.Element {
  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: {
      title: null
    }
  })

  const refetch = useCallback(search => {
    // Trigger a re-render of useLazyLoadQuery with new variables,
    // *and* an updated fetchKey.
    // The new fetchKey will ensure that the query is fully
    // re-evaluated and refetched.
    setQueryArgs(prev => ({
      options: {
        fetchKey: (prev?.options?.fetchKey ?? 0) + 1
      },
      variables: {
        title: search != null && search !== '' ? search : null
      }
    }))
  }, [])

  useEffect(() => {
    refetch(search)
  }, [search])

  return (
    <Suspense fallback={<CenteredSpinner />}>
      <ErrorBoundary
        fallback={({
          error,
          reset
        }) => (
          <ErrorFallback error={error} reset={reset} refetch={refetch as () => void} />
        )}
      >
        <SearchCategories selected={selected} onSelect={onSelect} queryArgs={queryArgs} />
      </ErrorBoundary>
    </Suspense>
  )
}
