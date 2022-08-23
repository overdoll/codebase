import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { RandomQuery as RandomQueryType } from '@//:artifacts/RandomQuery.graphql'
import RandomQuery from '@//:artifacts/RandomQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import { PageWrapper } from '@//:modules/content/PageLayout'
import BrowseStructuredData from '@//:common/structured-data/browse/BrowseStructuredData/BrowseStructuredData'
import Random from './Random/Random'
import RandomRichObject from '@//:common/rich-objects/random/RandomRichObject/RandomRichObject'

interface Props {
  queryRefs: {
    randomQuery: PreloadedQuery<RandomQueryType>
  }
}

const RootRandom: PageProps<Props> = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader(
    RandomQuery,
    props.queryRefs.randomQuery)

  return (
    <>
      <RandomRichObject />
      <BrowseStructuredData />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <Random query={queryRef as PreloadedQuery<RandomQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootRandom
