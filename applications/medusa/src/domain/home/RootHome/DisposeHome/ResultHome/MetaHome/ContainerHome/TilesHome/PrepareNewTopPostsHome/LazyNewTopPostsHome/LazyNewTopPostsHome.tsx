import { graphql } from 'react-relay'
import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazyNewTopPostsHomeQuery } from '@//:artifacts/LazyNewTopPostsHomeQuery.graphql'
import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import GridNewTopPostsHome from './GridNewTopPostsHome/GridNewTopPostsHome'

interface Props extends LazyArgumentsProps<{}> {

}

const Query = graphql`
  query LazyNewTopPostsHomeQuery {
    ...GridNewTopPostsHomeFragment
  }
`

export default function LazyNewTopPostsHome (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazyNewTopPostsHomeQuery>(Query, variables, options)

  return (
    <GridNewTopPostsHome rootQuery={data} />
  )
}
