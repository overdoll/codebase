import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import Emails from './Emails/Emails'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import type { EmailsQuery as EmailsQueryType } from '@//:artifacts/EmailsQuery.graphql'
import EmailsQuery from '@//:artifacts/EmailsQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<EmailsQueryType>
  }

}

export default function RootEmails (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    EmailsQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='email settings' />
      <PageWrapper>
        <BackButton to='/settings/profile'>
          <Trans>
            Back to profile settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Emails
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Add, remove, or promote your emails
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <Emails query={queryRef as PreloadedQuery<EmailsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
