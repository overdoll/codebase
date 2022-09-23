import React from 'react'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyNewTopPostsHome from './LazyNewTopPostsHome/LazyNewTopPostsHome'
import SuspenseNewTopPostsHome from './SuspenseNewTopPostsHome/SuspenseNewTopPostsHome'

export default function PrepareNewTopPostsHome (): JSX.Element {
  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<{}>({
    defaultValue: {}
  })

  return (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseNewTopPostsHome>
        <LazyNewTopPostsHome lazyArguments={lazyArguments} />
      </SuspenseNewTopPostsHome>
    </LazyPostsErrorBoundary>
  )
}
