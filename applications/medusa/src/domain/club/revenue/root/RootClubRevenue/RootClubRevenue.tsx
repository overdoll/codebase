import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubRevenueQuery as ClubRevenueQueryType } from '@//:artifacts/ClubRevenueQuery.graphql'
import ClubRevenueQuery from '@//:artifacts/ClubRevenueQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ClubRevenue from './ClubRevenue/ClubRevenue'

interface Props {
  queryRefs: {
    clubRevenueQuery: PreloadedQuery<ClubRevenueQueryType>
  }
}

const RootClubRevenue: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubRevenueQuery,
    props.queryRefs.clubRevenueQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          My Revenue :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonRectangleGrid />}>
            <ClubRevenue query={queryRef as PreloadedQuery<ClubRevenueQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootClubRevenue
