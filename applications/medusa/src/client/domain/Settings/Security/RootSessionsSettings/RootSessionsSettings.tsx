import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { SessionsSettingsQuery as SessionsSettingsQueryType } from '@//:artifacts/SessionsSettingsQuery.graphql'
import SessionsSettingsQuery from '@//:artifacts/SessionsSettingsQuery.graphql'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import SessionsSettings from './SessionsSettings/SessionsSettings'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

interface Props {
  query: PreloadedQuery<SessionsSettingsQueryType>
}

export default function RootSessionsSettings (props: Props): JSX.Element | null {
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
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <SessionsSettings query={queryRef as PreloadedQuery<SessionsSettingsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
