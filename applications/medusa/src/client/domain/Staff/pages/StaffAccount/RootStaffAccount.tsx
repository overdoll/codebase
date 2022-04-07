import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffAccountQuery as StaffAccountQueryType } from '@//:artifacts/StaffAccountQuery.graphql'
import StaffAccountQuery from '@//:artifacts/StaffAccountQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import StaffAccount from './StaffAccount/StaffAccount'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import PageWrapperDesktop from '../../components/PageWrapperDesktop/PageWrapperDesktop'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffAccountQueryType>
  }
}

export default function RootStaffAccount (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<StaffAccountQueryType>(
    StaffAccountQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet>
        <title>
          Account - Staff :: overdoll.com
        </title>
      </Helmet>
      <PageWrapperDesktop>
        <QueryErrorBoundary loadQuery={() => loadQuery({ username: match.username as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffAccount query={queryRef as PreloadedQuery<StaffAccountQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapperDesktop>
    </>
  )
}
