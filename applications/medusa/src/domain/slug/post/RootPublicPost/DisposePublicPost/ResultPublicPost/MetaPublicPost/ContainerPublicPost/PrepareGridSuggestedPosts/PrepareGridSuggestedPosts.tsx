import type { PrepareGridSuggestedPostsFragment$key } from '@//:artifacts/PrepareGridSuggestedPostsFragment.graphql'
import { graphql } from 'react-relay'
import React, { useMemo } from 'react'
import { useFragment } from 'react-relay/hooks'
import SuspenseLazyPosts from '@//:modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyGridSuggestedPosts from './LazyGridSuggestedPosts/LazyGridSuggestedPosts'

interface Props {
  postQuery: PrepareGridSuggestedPostsFragment$key
}

export interface PrepareSuggestedGridPostsLazyProps {
  reference: string
}

const Fragment = graphql`
  fragment PrepareGridSuggestedPostsFragment on Post {
    reference
  }
`

export default function PrepareGridSuggestedPosts (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(
    Fragment,
    postQuery
  )

  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<PrepareSuggestedGridPostsLazyProps>({
    defaultValue: {
      reference: postData.reference
    }
  })

  return useMemo(() => (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazyGridSuggestedPosts lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>
  ), [postData.reference])
}
