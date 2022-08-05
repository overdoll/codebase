import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubCharactersQuery as ClubCharactersQueryType } from '@//:artifacts/ClubCharactersQuery.graphql'
import ClubCharactersQuery from '@//:artifacts/ClubCharactersQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { PageProps } from '@//:types/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ClubCharacters from './ClubCharacters/ClubCharacters'

interface Props {
  queryRefs: {
    clubCharactersQuery: PreloadedQuery<ClubCharactersQueryType>
  }
}

const RootClubCharacters: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubCharactersQuery,
    props.queryRefs.clubCharactersQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          My Characters - overdoll
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonRectangleGrid />}>
            <ClubCharacters query={queryRef as PreloadedQuery<ClubCharactersQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootClubCharacters
