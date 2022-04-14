import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { MyClubsQuery as MyClubsQueryType } from '@//:artifacts/MyClubsQuery.graphql'
import MyClubsQuery from '@//:artifacts/MyClubsQuery.graphql'
import MyClubs from './MyClubs/MyClubs'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    clubsQuery: PreloadedQuery<MyClubsQueryType>
  }
}

const RootMyClubs: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    MyClubsQuery,
    props.queryRefs.clubsQuery
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

export default RootMyClubs
