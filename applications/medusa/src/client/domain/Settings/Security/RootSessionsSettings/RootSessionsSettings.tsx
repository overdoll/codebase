import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { SessionsSettingsQuery as SessionsSettingsQueryType } from '@//:artifacts/SessionsSettingsQuery.graphql'
import SessionsSettingsQuery from '@//:artifacts/SessionsSettingsQuery.graphql'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SessionsSettings from './SessionsSettings/SessionsSettings'

interface Props {
  query: PreloadedQuery<SessionsSettingsQueryType>
}

export default function RootSessionsSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    SessionsSettingsQuery,
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
        <PageSectionTitle>{t('security.sessions.title')}</PageSectionTitle>
        <PageSectionDescription>{t('security.sessions.description')}</PageSectionDescription>
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
          <SessionsSettings query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
