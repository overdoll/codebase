import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubHomeQuery, { ClubHomeQuery as ClubHomeQueryType } from '@//:artifacts/ClubHomeQuery.graphql'
import ClubHome from './ClubHome/ClubHome'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    clubHomeQuery: PreloadedQuery<ClubHomeQueryType>
  }
}

const RootClubHome: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubHomeQuery,
    props.queryRefs.clubHomeQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <PageWrapper>
      <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
        <Suspense fallback={<SkeletonStack />}>
          <ClubHome query={queryRef as PreloadedQuery<ClubHomeQueryType>} />
        </Suspense>
      </QueryErrorBoundary>
    </PageWrapper>
  )
}

export default RootClubHome
