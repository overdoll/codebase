import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import AccountSettingsQuery, {
  AccountSettingsQuery as AccountSettingsQueryType
} from '@//:artifacts/AccountSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import AccountSettings from './AccountSettings/AccountSettings'

interface Props {
  query: PreloadedQuery<AccountSettingsQueryType>
}

export default function RootAccountSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    AccountSettingsQuery,
    props.query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Account
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <AccountSettings query={queryRef as PreloadedQuery<AccountSettingsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
