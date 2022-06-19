import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import CreateClub from './CreateClub/CreateClub'
import { Trans } from '@lingui/macro'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import CreateClubQuery, { CreateClubQuery as CreateClubQueryType } from '@//:artifacts/CreateClubQuery.graphql'
import { Suspense } from 'react'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    createClubQuery: PreloadedQuery<CreateClubQueryType>
  }
}

const RootCreateClub: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    CreateClubQuery,
    props.queryRefs.createClubQuery
  )

  return (
    <>
      <Head>
        <title>
          Create your club - overdoll
        </title>
      </Head>
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

export default RootCreateClub
