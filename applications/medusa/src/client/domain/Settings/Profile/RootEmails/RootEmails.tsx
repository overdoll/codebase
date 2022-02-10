import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Emails from './Emails/Emails'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import type { EmailsQuery as EmailsQueryType } from '@//:artifacts/EmailsQuery.graphql'
import EmailsQuery from '@//:artifacts/EmailsQuery.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<EmailsQueryType>
}

export default function RootEmails (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    EmailsQuery,
    props.query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='green'>
          <Trans>
            Emails
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <Emails query={queryRef as PreloadedQuery<EmailsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
