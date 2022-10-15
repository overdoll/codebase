import type { PrepareClubPostsFragment$key } from '@//:artifacts/PrepareClubPostsFragment.graphql'
import { graphql } from 'react-relay'
import React, { useMemo } from 'react'
import { useFragment } from 'react-relay/hooks'
import SuspenseLazyPosts from '@//:modules/content/HookedComponents/Post/components/SuspenseLazyPosts/SuspenseLazyPosts'
import { LazyPostsErrorBoundary } from '@//:modules/content/HookedComponents/Post'
import useLazyArguments from '@//:modules/content/HookedComponents/Post/support/useLazyArguments'
import LazyClubPosts from './LazyClubPosts/LazyClubPosts'
import { Stack } from '@chakra-ui/react'
import { FreshLeaf } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import PageHeader from '@//:modules/content/PageLayout/Display/components/PageHeader/PageHeader'

interface Props {
  clubQuery: PrepareClubPostsFragment$key
}

export interface PreparePrepareClubPostsLazyProps {
  slug: string
}

const Fragment = graphql`
  fragment PrepareClubPostsFragment on Club {
    name
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

  const memo = useMemo(() => (
    <LazyPostsErrorBoundary loadQuery={loadQuery}>
      <SuspenseLazyPosts>
        <LazyClubPosts lazyArguments={lazyArguments} />
      </SuspenseLazyPosts>
    </LazyPostsErrorBoundary>
  ), [data.slug])

  return (
    <Stack spacing={4}>
      <PageHeader
        icon={FreshLeaf}
        title={(
          <Trans>
            New from {data.name}
          </Trans>
        )}
      />
      {memo}
    </Stack>
  )
}
