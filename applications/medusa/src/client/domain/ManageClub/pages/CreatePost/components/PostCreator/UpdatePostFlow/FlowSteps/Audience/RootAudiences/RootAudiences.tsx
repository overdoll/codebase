import { Suspense } from 'react'
import Audiences from './Audiences/Audiences'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonStack from '@//:modules/content/Skeleton/SkeletonStack/SkeletonStack'

interface Props {
  selected: string | null
  onSelect: (id: string) => void
}

export default function RootAudiences ({
  onSelect,
  selected
}: Props): JSX.Element {
  return (
    <QueryErrorBoundary loadQuery={() => {
    }}
    >
      <Suspense fallback={<SkeletonStack />}>
        <Audiences selected={selected} onSelect={onSelect} />
      </Suspense>
    </QueryErrorBoundary>
  )
}
