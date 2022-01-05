import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { PageWrapper, PostPlaceholder } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import ViewPost from './ViewPost/ViewPost'
import type { ViewPostQuery as ViewPostQueryType } from '@//:artifacts/ViewPostQuery.graphql'
import ViewPostQuery from '@//:artifacts/ViewPostQuery.graphql'
import { Skeleton, Stack } from '@chakra-ui/react'

import { useQueryParam } from 'use-query-params'

interface Props {
  prepared: {
    query: PreloadedQuery<ViewPostQueryType>
  }
}

export default function ViewPostRoot (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ViewPostQuery,
    props.prepared.query
  )

  const [postReference] = useQueryParam<string | null | undefined>('r')

  const LoadingPlaceholder = (): JSX.Element => {
    return (
      <Stack spacing={1}>
        <PostPlaceholder p={0}>
          <Skeleton />
        </PostPlaceholder>
      </Stack>
    )
  }

  return (
    <>
      <Helmet title='view post' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: postReference ?? '' })}>
          <Suspense fallback={<LoadingPlaceholder />}>
            <ViewPost query={queryRef as PreloadedQuery<ViewPostQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
