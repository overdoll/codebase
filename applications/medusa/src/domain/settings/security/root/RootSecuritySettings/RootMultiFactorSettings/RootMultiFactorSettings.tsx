import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  MultiFactorSettingsQuery as MultiFactorSettingsQueryType
} from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import MultiFactorSettingsQuery from '@//:artifacts/MultiFactorSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import MultiFactorSettings from './MultiFactorSettings/MultiFactorSettings'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { PageProps } from '@//:types/app'

interface Props {
  query: PreloadedQuery<MultiFactorSettingsQueryType>
}

const RootMultiFactorSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    MultiFactorSettingsQuery,
    props.query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Two-factor Authentication
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Setting up two-factor authentication adds an extra layer of security in case your account is
            compromised. Two-factor is required to access some features.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <MultiFactorSettings query={queryRef as PreloadedQuery<MultiFactorSettingsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}

export default RootMultiFactorSettings
