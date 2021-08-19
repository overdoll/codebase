/**
 * @flow
 */
import { useQueryLoader } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { QueueSettingsQuery as QueueSettingsQueryType } from '@//:artifacts/QueueSettingsQuery.graphql'
import QueueSettings from './QueueSettings/QueueSettings'
import { Divider, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import QueueSettingsQuery from '@//:artifacts/QueueSettingsQuery.graphql'

type Props = {
  query: PreloadedQueryInner<QueueSettingsQueryType>,
}

export default function RootQueueSettings (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    QueueSettingsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('moderation.queue.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <QueueSettings query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
