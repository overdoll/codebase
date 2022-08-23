import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { BrowseQuery as BrowseQueryType } from '@//:artifacts/BrowseQuery.graphql'
import BrowseQuery from '@//:artifacts/BrowseQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import { PageWrapper } from '@//:modules/content/PageLayout'
import BrowseStructuredData from '@//:common/structured-data/browse/BrowseStructuredData/BrowseStructuredData'
import Browse from './Browse/Browse'
import BrowseRichObject from '@//:common/rich-objects/browse/BrowseRichObject/BrowseRichObject'

interface Props {
  queryRefs: {
    browseQuery: PreloadedQuery<BrowseQueryType>
  }
}

const RootBrowse: PageProps<Props> = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader(
    BrowseQuery,
    props.queryRefs.browseQuery)

  return (
    <>
      <BrowseRichObject />
      <BrowseStructuredData />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonPost />}>
            <Browse query={queryRef as PreloadedQuery<BrowseQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootBrowse
