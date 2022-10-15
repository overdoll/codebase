import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import React, { useMemo } from 'react'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import SuspenseLazyPosts
  from '../../../../../../../../modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import LazySampleFeed from './LazySampleFeed/LazySampleFeed'

export default function PrepareSampleFeed (): JSX.Element {
  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<{}>({
    defaultValue: {}
  })

  return useMemo(() => (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazySampleFeed lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>), [])
}
