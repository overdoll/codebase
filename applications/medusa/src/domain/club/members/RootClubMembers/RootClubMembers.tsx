import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubMembersQuery, { ClubMembersQuery as ClubMembersQueryType } from '@//:artifacts/ClubMembersQuery.graphql'
import ClubMembers from './ClubMembers/ClubMembers'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    clubMembersQuery: PreloadedQuery<ClubMembersQueryType>
  }
}

const RootClubMembers: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubMembersQuery,
    props.queryRefs.clubMembersQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            Club Members
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubMembers query={queryRef as PreloadedQuery<ClubMembersQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootClubMembers
