import type { PrepareClubPostsFragment$key } from '@//:artifacts/PrepareClubPostsFragment.graphql'
import { graphql } from 'react-relay'
import React, { useMemo } from 'react'
import { useFragment } from 'react-relay/hooks'
import SuspenseLazyPosts from '@//:modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyClubPosts from './LazyClubPosts/LazyClubPosts'

interface Props {
  clubQuery: PrepareClubPostsFragment$key
}

export interface PreparePrepareClubPostsLazyProps {
  slug: string
}

const Fragment = graphql`
  fragment PrepareClubPostsFragment on Club {
    id
    slug
  }
`

export default function PrepareClubPosts (props: Props): JSX.Element {
  const { clubQuery } = props

  const data = useFragment(
    Fragment,
    clubQuery
  )

  const {
    lazyArguments,
    loadQuery
  } = useLazyArguments<PreparePrepareClubPostsLazyProps>({
    defaultValue: {
      slug: data.slug
    }
  })

  return useMemo(() => (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazyClubPosts lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>
  ), [data.slug])
}
