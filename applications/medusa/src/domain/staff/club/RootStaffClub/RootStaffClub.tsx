import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffClubQuery as StaffClubQueryType } from '@//:artifacts/StaffClubQuery.graphql'
import StaffClubQuery from '@//:artifacts/StaffClubQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import StaffClub from './StaffClub/StaffClub'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffClubQuery: PreloadedQuery<StaffClubQueryType>
  }
}

const RootStaffClub: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffClubQueryType>(
    StaffClubQuery,
    props.queryRefs.staffClubQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffClub query={queryRef as PreloadedQuery<StaffClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffClub
