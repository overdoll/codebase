import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { UsernameSettingsQuery as UsernameSettingsQueryType } from '@//:artifacts/UsernameSettingsQuery.graphql'
import UsernameSettingsQuery from '@//:artifacts/UsernameSettingsQuery.graphql'
import UsernameSettings from './UsernameSettings/UsernameSettings'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    usernameSettingsQuery: PreloadedQuery<UsernameSettingsQueryType>
  }
}

const RootUsernameSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    UsernameSettingsQuery,
    props.queryRefs.usernameSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Username - Profile - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/profile'>
          <Trans>
            Back to Profile Settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Username
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Modify your displayed username
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <UsernameSettings query={queryRef as PreloadedQuery<UsernameSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootUsernameSettings
