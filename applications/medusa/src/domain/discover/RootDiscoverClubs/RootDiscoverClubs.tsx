import { PageProps } from '@//:types/app'
import { ContentContainer, PageContainer } from '@//:modules/content/PageLayout'
import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import DiscoverClubs from './DiscoverClubs/DiscoverClubs'
import type { DiscoverClubsQuery as DiscoverClubsQueryType } from '@//:artifacts/DiscoverClubsQuery.graphql'
import DiscoverClubsQuery from '@//:artifacts/DiscoverClubsQuery.graphql'
import RootDiscoverClubsRichObject
  from '@//:common/rich-objects/clubs/discover/RootDiscoverClubsRichObject/RootDiscoverClubsRichObject'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'

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
      <RootDiscoverClubsRichObject />
      <RootStructuredData />
      <PageContainer>
        <ContentContainer pt={2}>
          <QueryErrorBoundary loadQuery={() => loadQuery({})}>
            <Suspense fallback={<></>}>
              <DiscoverClubs query={queryRef as PreloadedQuery<DiscoverClubsQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </ContentContainer>
      </PageContainer>
    </>
  )
}

export default RootDiscoverClubs
