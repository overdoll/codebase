/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery as MultiFactorSettingsQueryType } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorSettingsQuery from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import ErrorFallback from '@//:modules/content/ErrorFallback/ErrorFallback'
import { Suspense } from 'react'
import MultiFactorSettings from './MultiFactorSettings/MultiFactorSettings'
import { useQueryLoader } from 'react-relay/hooks'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'

type Props = {
  query: PreloadedQueryInner<MultiFactorSettingsQueryType>,
}

export default function RootMultiFactorSettings (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorSettingsQuery,
    props.query
  )

  const [t] = useTranslation('settings')

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>{t('security.multi_factor.title')}</PageSectionTitle>
        <PageSectionDescription>{t('security.multi_factor.description')}</PageSectionDescription>
      </PageSectionWrap>
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
