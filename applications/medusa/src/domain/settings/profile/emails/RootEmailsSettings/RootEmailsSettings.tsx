import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import EmailsSettings from './EmailsSettings/EmailsSettings'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import type { EmailsSettingsQuery as EmailsSettingsQueryType } from '@//:artifacts/EmailsSettingsQuery.graphql'
import EmailsSettingsQuery from '@//:artifacts/EmailsSettingsQuery.graphql'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    emailsSettingsQuery: PreloadedQuery<EmailsSettingsQueryType>
  }
}

const RootEmailsSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    EmailsSettingsQuery,
    props.queryRefs.emailsSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Email Settings - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/profile'>
          <Trans>
            Back to Profile Settings
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
            <EmailsSettings query={queryRef as PreloadedQuery<EmailsSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootEmailsSettings
