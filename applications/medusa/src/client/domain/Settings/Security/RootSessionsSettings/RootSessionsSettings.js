/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { SessionsSettingsQuery as SessionsSettingsQueryType } from '@//:artifacts/SessionsSettingsQuery.graphql'
import SessionsSettingsQuery from '@//:artifacts/SessionsSettingsQuery.graphql'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '../../../../../modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { useQueryLoader } from 'react-relay/hooks'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '../../../../../modules/content/PageLayout'
import SessionsSettings from './SessionsSettings/SessionsSettings'

type Props = {
  query: PreloadedQueryInner<SessionsSettingsQueryType>,
}

export default function RootSessionsSettings (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    SessionsSettingsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('security.sessions.title')}</PageSectionTitle>
        <PageSectionDescription>{t('security.sessions.description')}</PageSectionDescription>
      </PageSectionWrap>
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <SessionsSettings query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
