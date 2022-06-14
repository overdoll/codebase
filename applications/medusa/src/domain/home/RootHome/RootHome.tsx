import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { HomeQuery as HomeQueryType } from '@//:artifacts/HomeQuery.graphql'
import HomeQuery from '@//:artifacts/HomeQuery.graphql'
import Home from './Home/Home'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'

interface Props {
  queryRefs: {
    homeQuery: PreloadedQuery<HomeQueryType>
  }
}

const RootHome: PageProps<Props> = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader(
    HomeQuery,
    props.queryRefs.homeQuery
  )

  return (
    <>
      <Head>
        <title>overdoll.com - Rule34, Hentai, 3D Porn and Videos</title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <Home query={queryRef as PreloadedQuery<HomeQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootHome
