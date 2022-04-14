import { Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffAccountQuery as StaffAccountQueryType } from '@//:artifacts/StaffAccountQuery.graphql'
import StaffAccountQuery from '@//:artifacts/StaffAccountQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import StaffAccount from './StaffAccount/StaffAccount'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import PageWrapperDesktop from '../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffAccountQuery: PreloadedQuery<StaffAccountQueryType>
  }
}

const RootStaffAccount: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffAccountQueryType>(
    StaffAccountQuery,
    props.queryRefs.staffAccountQuery
  )

  const { query: { username } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Account - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapperDesktop>
        <QueryErrorBoundary loadQuery={() => loadQuery({ username: username as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffAccount query={queryRef as PreloadedQuery<StaffAccountQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapperDesktop>
    </>
  )
}

export default RootStaffAccount
