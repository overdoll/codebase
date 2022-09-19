import type { PrepareSuggestedPostsFragment$key } from '@//:artifacts/PrepareSuggestedPostsFragment.graphql'
import { graphql } from 'react-relay'
import React from 'react'
import { useFragment } from 'react-relay/hooks'
import LazySuggestedPosts from './LazySuggestedPosts/LazySuggestedPosts'
import SuspenseLazyPosts from '@//:modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'

interface Props {
  postQuery: PrepareSuggestedPostsFragment$key
}

export interface PrepareSuggestedPostsLazyProps {
  reference: string
}

const Fragment = graphql`
  fragment PrepareSuggestedPostsFragment on Post {
    reference
  }
`

export default function PrepareSuggestedPosts (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(
    Fragment,
    postQuery
  )

  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<PrepareSuggestedPostsLazyProps>({
    defaultValue: {
      reference: postData.reference
    }
  })

  return (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazySuggestedPosts lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>
  )
}
