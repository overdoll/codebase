import Head from 'next/head'
import { PageProps } from '@//:types/app'
import SearchSuggestedClubs from './SearchSuggestedClubs/SearchSuggestedClubs'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import DiscoverClubs from './DiscoverClubs/DiscoverClubs'
import type { DiscoverClubsQuery as DiscoverClubsQueryType } from '@//:artifacts/DiscoverClubsQuery.graphql'
import DiscoverClubsQuery from '@//:artifacts/DiscoverClubsQuery.graphql'

interface Props {
  queryRefs: {
    discoverClubsQuery: PreloadedQuery<DiscoverClubsQueryType>
  }
}

const RootDiscoverClubs: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    DiscoverClubsQuery,
    props.queryRefs.discoverClubsQuery
  )

  return (
    <>
      <Head>
        <title>
          Discover Clubs :: overdoll
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<></>}>
            <DiscoverClubs query={queryRef as PreloadedQuery<DiscoverClubsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
        <SearchSuggestedClubs />
      </PageWrapper>
    </>
  )
}

export default RootDiscoverClubs