import { graphql } from 'react-relay'
import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazyHomePostsQuery } from '@//:artifacts/LazyHomePostsQuery.graphql'
import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import ScrollHomePosts from './ScrollHomePosts/ScrollHomePosts'
import { PrepareHomePostsLazyProps } from '../PrepareHomePosts'

interface Props extends LazyArgumentsProps<PrepareHomePostsLazyProps> {

}

const Query = graphql`
  query LazyHomePostsQuery($seed: String) {
    ...ScrollHomePostsFragment @arguments(seed: $seed)
  }
`

export default function LazyHomePosts (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazyHomePostsQuery>(Query, variables, options)

  return (
    <ScrollHomePosts rootQuery={data} />
  )
}
