import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import QueueSettingsQuery from '@//:artifacts/QueueSettingsQuery.graphql'
import QueueSettings from './QueueSettings/QueueSettings'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<QueueSettingsQueryType>
}

export default function RootQueueSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    QueueSettingsQuery,
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
        <PageSectionTitle>{t('moderation.queue.title')}</PageSectionTitle>
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
          <QueueSettings query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
