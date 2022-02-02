import { Suspense } from 'react'
import Audiences from './Audiences/Audiences'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonStack from '@//:modules/content/Placeholder/Skeleton/SkeletonStack/SkeletonStack'
import { SingleSelectedValue, SingleSelectedValueFunction } from '@//:modules/content/ContentSelection/hooks/useSingleSelector'

interface Props {
  selected: SingleSelectedValue
  onSelect: SingleSelectedValueFunction
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
