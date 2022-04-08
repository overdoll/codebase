import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import QueueSettingsQuery from '@//:artifacts/QueueSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'
import CurationSettings from './CurationSettings/CurationSettings'

interface Props {
  query: PreloadedQuery<CurationSettingsQueryType>
}

export default function RootCurationSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    QueueSettingsQuery,
    props.query
  )

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Content Curation
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          When you create your account, you'll have the ability to go through a curation flow to let us know what kind
          of content you'd like to see.
        </PageSectionDescription>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={() => loadQuery({})}>
        <Suspense fallback={<SkeletonStack />}>
          <CurationSettings query={queryRef as PreloadedQuery<CurationSettingsQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  )
}
