import { Suspense } from 'react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import Brands from './Brands/Brands'

interface Props {
  selected: string | null
  onSelect: (id: string) => void
}

export default function RootBrands ({
  onSelect,
  selected
}: Props): JSX.Element {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <ErrorBoundary
        fallback={({
          error,
          reset
        }) => (
          <ErrorFallback error={error} reset={reset} />
        )}
      >
        <Brands selected={selected} onSelect={onSelect} />
      </ErrorBoundary>
    </Suspense>
  )
}
