import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import type { ProfileQuery as ProfileQueryType } from '@//:artifacts/ProfileQuery.graphql'
import ProfileQuery from '@//:artifacts/ProfileQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import Profile from './Profile/Profile'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    profileQuery: PreloadedQuery<ProfileQueryType>
  }
}

const RootProfile: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ProfileQuery,
    props.queryRefs.profileQuery
  )

  const { query: { username } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Profile :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ username: username as string })}>
          <Suspense fallback={<SkeletonPost />}>
            <Profile query={queryRef as PreloadedQuery<ProfileQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
export default RootProfile
