import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import PublicClubQuery, { PublicClubQuery as PublicClubQueryType } from '@//:artifacts/PublicClubQuery.graphql'
import PublicClub from './PublicClub/PublicClub'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    publicClubQuery: PreloadedQuery<PublicClubQueryType>
  }
}

const RootPublicClub: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicClubQuery,
    props.queryRefs.publicClubQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club - overdoll
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonPost />}>
            <PublicClub query={queryRef as PreloadedQuery<PublicClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootPublicClub
