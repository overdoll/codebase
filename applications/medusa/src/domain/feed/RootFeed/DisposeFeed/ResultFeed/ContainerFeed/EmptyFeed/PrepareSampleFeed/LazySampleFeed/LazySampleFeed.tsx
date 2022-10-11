import { graphql } from 'react-relay'
import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazySampleFeedQuery } from '@//:artifacts/LazySampleFeedQuery.graphql'
import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import ScrollSampleFeed from './ScrollSampleFeed/ScrollSampleFeed'

interface Props extends LazyArgumentsProps<{}> {

}

const Query = graphql`
  query LazySampleFeedQuery {
    ...ScrollSampleFeedFragment
  }
`

export default function LazySampleFeed (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazySampleFeedQuery>(Query, variables, options)

  return (
    <ScrollSampleFeed rootQuery={data} />
  )
}
