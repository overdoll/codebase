import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { MultiFactorSettingsQuery as MultiFactorSettingsQueryType } from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorSettingsQuery from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import { useTranslation } from 'react-i18next'
import SkeletonStack from '@//:modules/content/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import MultiFactorSettings from './MultiFactorSettings/MultiFactorSettings'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'

interface Props {
  query: PreloadedQuery<MultiFactorSettingsQueryType>
}

export default function RootMultiFactorSettings (props: Props): JSX.Element | null {
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
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <MultiFactorSettings query={queryRef as PreloadedQuery<MultiFactorSettingsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
