import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Skeleton/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubMembersQuery, { ClubMembersQuery as ClubMembersQueryType } from '@//:artifacts/ClubMembersQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ClubMembers from './ClubMembers/ClubMembers'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubMembersQueryType>
  }
}

export default function RootClubMembers (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubMembersQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club members' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            Club Members
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubMembers query={queryRef as PreloadedQuery<ClubMembersQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
