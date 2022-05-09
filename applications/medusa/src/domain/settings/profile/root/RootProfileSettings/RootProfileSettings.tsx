import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import ProfileSettingsQuery, {
  ProfileSettingsQuery as ProfileSettingsQueryType
} from '@//:artifacts/ProfileSettingsQuery.graphql'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    profileSettingsQuery: PreloadedQuery<ProfileSettingsQueryType>
  }
}

const RootProfileSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ProfileSettingsQuery,
    props.queryRefs.profileSettingsQuery
  )

  return (
    <>
      <Head>
        <title>
          Profile - Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <ProfileSettings query={queryRef as PreloadedQuery<ProfileSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootProfileSettings
