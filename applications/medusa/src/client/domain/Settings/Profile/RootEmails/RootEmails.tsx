import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Emails from './Emails/Emails'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import type { EmailsQuery as EmailsQueryType } from '@//:artifacts/EmailsQuery.graphql'
import EmailsQuery from '@//:artifacts/EmailsQuery.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

interface Props {
  query: PreloadedQuery<EmailsQueryType>
}

export default function RootEmails (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    EmailsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('profile.email.title')}</PageSectionTitle>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <Emails query={queryRef as PreloadedQuery<EmailsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
