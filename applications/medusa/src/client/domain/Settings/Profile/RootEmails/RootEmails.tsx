import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Emails from './Emails/Emails'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import type { EmailsQuery as EmailsQueryType } from '@//:artifacts/EmailsQuery.graphql'
import EmailsQuery from '@//:artifacts/EmailsQuery.graphql'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<EmailsQueryType>
}

export default function RootEmails (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    EmailsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  const refetch = (): void => {
    loadQuery({})
  }

  if (queryRef == null) return null

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('profile.email.title')}</PageSectionTitle>
      </PageSectionWrap>
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({
            error,
            reset
          }) => (
            <ErrorFallback
              error={error}
              reset={reset}
              refetch={refetch}
            />
          )}
        >
          <Emails query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
