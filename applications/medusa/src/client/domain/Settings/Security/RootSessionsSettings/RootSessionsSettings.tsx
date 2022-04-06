import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { SessionsSettingsQuery as SessionsSettingsQueryType } from '@//:artifacts/SessionsSettingsQuery.graphql'
import SessionsSettingsQuery from '@//:artifacts/SessionsSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import SessionsSettings from './SessionsSettings/SessionsSettings'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<SessionsSettingsQueryType>
  }

}

export default function RootSessionsSettings (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    SessionsSettingsQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet>
        <title>
          Sessions - Security - Settings :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <BackButton to='/settings/security'>
          <Trans>
            Back to settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            <Trans>
              Sessions
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Here is a list of devices that have logged into your account. You can tap on one to view the details.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <SessionsSettings query={queryRef as PreloadedQuery<SessionsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
