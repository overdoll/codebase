import { Helmet } from 'react-helmet-async'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { MyClubsQuery as MyClubsQueryType } from '@//:artifacts/MyClubsQuery.graphql'
import MyClubsQuery from '@//:artifacts/MyClubsQuery.graphql'
import MyClubs from './MyClubs/MyClubs'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<MyClubsQueryType>
  }
}

export default function RootHome (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    MyClubsQuery,
    props.prepared.query
  )

  return (
    <>
      <Head>
        <title>
          My Clubs :: overdoll
        </title>
      </Head>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={(
          <PageWrapper>
            <SkeletonPost />
          </PageWrapper>)}
        >
          <MyClubs query={queryRef as PreloadedQuery<MyClubsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
