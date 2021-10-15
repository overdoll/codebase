/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'

export default function RootCreatePost (): Node {
  const loadQuery = () => {
  }

  return (
    <>
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <></>
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
