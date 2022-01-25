import { Suspense, useEffect } from 'react'
import SearchCharacters from './SearchCharacters/SearchCharacters'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Skeleton/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { useSearchQueryArguments } from '@//:modules/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

interface Props {
  search?: string
  selected: string[]
  onSelect: (character) => void
}

export default function RootSearchCategories ({
  search,
  onSelect,
  selected
}: Props): JSX.Element {
  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ name: null })

  useEffect(() => {
    setQueryArgs({ name: search })
  }, [search])

  return (
    <QueryErrorBoundary
      loadQuery={() => setQueryArgs({ name: null })}
    >
      <Suspense fallback={<SkeletonRectangleGrid />}>
        <SearchCharacters
          selected={selected}
          onSelect={onSelect}
          queryArgs={queryArgs}
        />
      </Suspense>
    </QueryErrorBoundary>

  )
}
