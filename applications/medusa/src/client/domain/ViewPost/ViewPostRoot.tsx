import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ViewPost from './ViewPost/ViewPost'
import type { ViewPostQuery as ViewPostQueryType } from '@//:artifacts/ViewPostQuery.graphql'
import ViewPostQuery from '@//:artifacts/ViewPostQuery.graphql'

import { useQueryParam } from 'use-query-params'
import Redirect from '@//:modules/routing/Redirect'

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

  if (postReference == null) return <Redirect to='/' />

  return (
    <>
      <Helmet title='view post' />
      <PageWrapper fillPage>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: postReference })}>
          <Suspense fallback={<SkeletonStack />}>
            <ViewPost query={queryRef as PreloadedQuery<ViewPostQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
