import React from 'react'
import SuspenseLazyPosts from '@//:modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyHomePosts from './LazyHomePosts/LazyHomePosts'

export interface PrepareHomePostsLazyProps {
  seed: string | null
}

export default function PrepareHomePosts (): JSX.Element {
  // TODO Fix seed here

  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<PrepareHomePostsLazyProps>({
    defaultValue: {
      seed: null
    }
  })

  return (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazyHomePosts lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>
  )
}
