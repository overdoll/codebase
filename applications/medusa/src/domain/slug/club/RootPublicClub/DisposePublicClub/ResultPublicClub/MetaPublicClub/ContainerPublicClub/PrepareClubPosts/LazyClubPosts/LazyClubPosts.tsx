import { graphql } from 'react-relay'
import React from 'react'
import { useLazyLoadQuery } from 'react-relay/hooks'
import { LazyClubPostsQuery } from '@//:artifacts/LazyClubPostsQuery.graphql'
import { EmptyPosts } from '@//:modules/content/Placeholder'
import { LazyArgumentsProps } from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import { PreparePrepareClubPostsLazyProps } from '../PrepareClubPosts'
import ScrollClubPosts from './ScrollClubPosts/ScrollClubPosts'

interface Props extends LazyArgumentsProps<PreparePrepareClubPostsLazyProps> {

}

const Query = graphql`
  query LazyClubPostsQuery($slug: String!, $seed: String) {
    club(slug: $slug) {
      ...ScrollClubPostsFragment @arguments(seed: $seed)
    }
  }
`

export default function LazyClubPosts (props: Props): JSX.Element {
  const {
    lazyArguments: {
      variables,
      options
    }
  } = props

  const data = useLazyLoadQuery<LazyClubPostsQuery>(Query, variables, options)

  if (data.club == null) {
    return (
      <EmptyPosts />
    )
  }

  return (
    <ScrollClubPosts clubQuery={data.club} />
  )
}
