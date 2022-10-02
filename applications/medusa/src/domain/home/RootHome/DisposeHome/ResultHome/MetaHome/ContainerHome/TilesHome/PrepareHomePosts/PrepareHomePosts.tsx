import React, { useMemo } from 'react'
import SuspenseLazyPosts from '@//:modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyHomePosts from './LazyHomePosts/LazyHomePosts'
import getSeedFromCookie from '@//:modules/content/HookedComponents/Post/support/getSeedFromCookie'

export interface PrepareHomePostsLazyProps {
  seed: string | null
}

export default function PrepareHomePosts (): JSX.Element {
  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<PrepareHomePostsLazyProps>({
    defaultValue: {
      ...getSeedFromCookie()
    }
  })

  return useMemo(() => (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazyHomePosts lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>), [])
}
