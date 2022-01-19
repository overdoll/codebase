import { Suspense } from 'react'
import CenteredSpinner from '@//:modules/content/Skeleton/Loading/CenteredSpinner/CenteredSpinner'
import Audiences from './Audiences/Audiences'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

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
      <Suspense fallback={<CenteredSpinner />}>
        <Audiences selected={selected} onSelect={onSelect} />
      </Suspense>
    </QueryErrorBoundary>
  )
}
