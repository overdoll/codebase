import { graphql } from 'react-relay'
import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazyGridSuggestedPostsQuery } from '@//:artifacts/LazyGridSuggestedPostsQuery.graphql'
import { EmptyPosts } from '@//:modules/content/Placeholder'
import ScrollGridSuggestedPosts from './ScrollGridSuggestedPosts/ScrollGridSuggestedPosts'
import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import { PrepareSuggestedGridPostsLazyProps } from '../PrepareGridSuggestedPosts'

interface Props extends LazyArgumentsProps<PrepareSuggestedGridPostsLazyProps> {

}

const Query = graphql`
  query LazyGridSuggestedPostsQuery($reference: String!) {
    post(reference: $reference) {
      ...ScrollGridSuggestedPostsFragment
    }
  }
`

export default function LazyGridSuggestedPosts (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazyGridSuggestedPostsQuery>(Query, variables, options)

  if (data.post == null) {
    return (
      <EmptyPosts />
    )
  }

  return (
    <ScrollGridSuggestedPosts postQuery={data.post} />
  )
}
