import { graphql } from 'react-relay'
import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazySuggestedPostsQuery } from '@//:artifacts/LazySuggestedPostsQuery.graphql'
import { EmptyPosts } from '@//:modules/content/Placeholder'
import ScrollSuggestedPosts from './ScrollSuggestedPosts/ScrollSuggestedPosts'
import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import { PrepareSuggestedPostsLazyProps } from '../PrepareSuggestedPosts'

interface Props extends LazyArgumentsProps<PrepareSuggestedPostsLazyProps> {

}

const Query = graphql`
  query LazySuggestedPostsQuery($reference: String!) {
    post(reference: $reference) {
      ...ScrollSuggestedPostsFragment
    }
  }
`

export default function LazySuggestedPosts (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazySuggestedPostsQuery>(Query, variables, options)

  if (data.post == null) {
    return (
      <EmptyPosts />
    )
  }

  return (
    <ScrollSuggestedPosts postQuery={data.post} />
  )
}
