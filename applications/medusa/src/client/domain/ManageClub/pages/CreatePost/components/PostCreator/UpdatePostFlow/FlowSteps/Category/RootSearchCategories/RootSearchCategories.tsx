import { Suspense, useEffect } from 'react'
import SearchCategories from './SearchCategories/SearchCategories'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Skeleton/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { useSearchQueryArguments } from '@//:modules/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

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
  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ title: null })

  useEffect(() => {
    setQueryArgs({ title: search })
  }, [search])

  return (
    <QueryErrorBoundary loadQuery={() => setQueryArgs({ title: null })}>
      <Suspense fallback={<SkeletonRectangleGrid />}>
        <SearchCategories selected={selected} onSelect={onSelect} queryArgs={queryArgs} />
      </Suspense>
    </QueryErrorBoundary>
  )
}
