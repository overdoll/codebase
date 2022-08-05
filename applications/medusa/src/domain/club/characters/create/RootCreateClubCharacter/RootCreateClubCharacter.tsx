import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  CreateClubCharacterQuery as CreateClubCharacterQueryType
} from '@//:artifacts/CreateClubCharacterQuery.graphql'
import CreateClubCharacterQuery from '@//:artifacts/CreateClubCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { PageProps } from '@//:types/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CreateClubCharacter from './CreateClubCharacter/CreateClubCharacter'

interface Props {
  queryRefs: {
    createClubCharacterQuery: PreloadedQuery<CreateClubCharacterQueryType>
  }
}

const RootCreateClubCharacter: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    CreateClubCharacterQuery,
    props.queryRefs.createClubCharacterQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Create Character - overdoll
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonRectangleGrid />}>
            <CreateClubCharacter query={queryRef as PreloadedQuery<CreateClubCharacterQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootCreateClubCharacter
