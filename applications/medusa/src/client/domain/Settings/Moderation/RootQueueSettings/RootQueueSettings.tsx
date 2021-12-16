import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import QueueSettingsQuery from '@//:artifacts/QueueSettingsQuery.graphql'
import QueueSettings from './QueueSettings/QueueSettings'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

interface Props {
  query: PreloadedQuery<QueueSettingsQueryType>
}

export default function RootQueueSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    QueueSettingsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('moderation.queue.title')}</PageSectionTitle>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <QueueSettings query={queryRef as PreloadedQuery<QueueSettingsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
