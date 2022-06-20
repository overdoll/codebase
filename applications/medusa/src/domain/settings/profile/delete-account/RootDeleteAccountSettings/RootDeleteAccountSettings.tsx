import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import DeleteAccountSettings from './DeleteAccountSettings/DeleteAccountSettings'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import type {
  DeleteAccountSettingsQuery as DeleteAccountSettingsQueryType
} from '@//:artifacts/DeleteAccountSettingsQuery.graphql'
import DeleteAccountSettingsQuery from '@//:artifacts/DeleteAccountSettingsQuery.graphql'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    deleteAccountSettingsQuery: PreloadedQuery<DeleteAccountSettingsQueryType>
  }
}

const RootDeleteAccountSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    DeleteAccountSettingsQuery,
    props.queryRefs.deleteAccountSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Delete Account - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href='/settings/profile'>
          <Trans>
            Back to Profile Settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            <Trans>
              Delete Account
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <DeleteAccountSettings query={queryRef as PreloadedQuery<DeleteAccountSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootDeleteAccountSettings
