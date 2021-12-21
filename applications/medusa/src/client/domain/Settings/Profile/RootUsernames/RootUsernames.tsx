import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { UsernamesQuery as UsernamesQueryType } from '@//:artifacts/UsernamesQuery.graphql'
import UsernamesQuery from '@//:artifacts/UsernamesQuery.graphql'
import Usernames from './Usernames/Usernames'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<UsernamesQueryType>
}

export default function RootUsernames (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    UsernamesQuery,
    props.query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Username
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <Usernames query={queryRef as PreloadedQuery<UsernamesQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
