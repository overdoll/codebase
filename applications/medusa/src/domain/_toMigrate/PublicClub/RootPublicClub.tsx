import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import PublicClubQuery, { PublicClubQuery as PublicClubQueryType } from '@//:artifacts/PublicClubQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import PublicClub from './PublicClub/PublicClub'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import LockedAccountBanner from '../../home/Home/LockedAccount/LockedAccountBanner/LockedAccountBanner'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<PublicClubQueryType>
  }
}

export default function RootPublicClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicClubQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Head>
        <title>
          Club :: overdoll
        </title>
      </Head>
      <PageWrapper>
        <LockedAccountBanner />
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonPost />}>
            <PublicClub query={queryRef as PreloadedQuery<PublicClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
