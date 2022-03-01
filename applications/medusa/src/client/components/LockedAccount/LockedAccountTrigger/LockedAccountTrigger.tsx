import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import { Suspense } from 'react'
import LockedAccountButton from './LockedAccountButton/LockedAccountButton'

export default function LockedAccountTrigger (): JSX.Element | null {
  return (
    <QueryErrorBoundary loadQuery={() => {
    }}
    >
      <Suspense fallback={null}>
        <LockedAccountButton />
      </Suspense>
    </QueryErrorBoundary>
  )
}
