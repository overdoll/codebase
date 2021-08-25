/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery as MultiFactorSettingsQueryType } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorSettingsQuery from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import { Divider, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '../../../../../modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import MultiFactorSettings from './MultiFactorSettings/MultiFactorSettings'
import { useQueryLoader } from 'react-relay/hooks'

type Props = {
  query: PreloadedQueryInner<MultiFactorSettingsQueryType>,
}

export default function RootMultiFactorSettings (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('security.multi_factor.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Suspense fallback={<SkeletonStack />}>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
          )}
        >
          <MultiFactorSettings query={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
