import { Helmet } from 'react-helmet-async'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import CreateClub from './CreateClub/CreateClub'
import { Trans } from '@lingui/macro'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import CreateClubQuery, { CreateClubQuery as CreateClubQueryType } from '@//:artifacts/CreateClubQuery.graphql'
import { Suspense } from 'react'

interface Props {
  prepared: {
    query: PreloadedQuery<CreateClubQueryType>
  }
}

export default function RootCreateClub (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    CreateClubQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create club' />
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Create a Club
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            Creating a club allows you to create posts and display them, as well as your community, in one place.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <CreateClub query={queryRef as PreloadedQuery<CreateClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
