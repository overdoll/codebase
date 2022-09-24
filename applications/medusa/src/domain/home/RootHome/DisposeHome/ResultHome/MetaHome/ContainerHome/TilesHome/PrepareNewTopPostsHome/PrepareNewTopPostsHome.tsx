import React from 'react'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyNewTopPostsHome from './LazyNewTopPostsHome/LazyNewTopPostsHome'
import SuspenseNewTopPostsHome from './SuspenseNewTopPostsHome/SuspenseNewTopPostsHome'
import getSeedFromCookie from '@//:modules/content/HookedComponents/Post/support/getSeedFromCookie'

export default function PrepareNewTopPostsHome (): JSX.Element {
  const { seed } = getSeedFromCookie()

  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<{}>({
    defaultValue: {
      seed: `${seed ?? ''}_trending`
    }
  })

  return (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseNewTopPostsHome>
        <LazyNewTopPostsHome lazyArguments={lazyArguments} />
      </SuspenseNewTopPostsHome>
    </LazyPostsErrorBoundary>
  )
}
