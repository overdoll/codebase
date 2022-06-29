import { Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { SearchCategoryQuery as SearchCategoryQueryType } from '@//:artifacts/SearchCategoryQuery.graphql'
import SearchCategoryQuery from '@//:artifacts/SearchCategoryQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import SearchCategory from './SearchCategory/SearchCategory'
import useSearchSortArguments
  from '../../../../common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import { PageWrapper } from '@//:modules/content/PageLayout'
import RootSearchRichObject from '../../../../common/rich-objects/search/RootSearchRichObject/RootSearchRichObject'

interface Props {
  queryRefs: {
    searchCategoryQuery: PreloadedQuery<SearchCategoryQueryType>
  }
}

const RootSearchCategory: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<SearchCategoryQueryType>(
    SearchCategoryQuery,
    props.queryRefs.searchCategoryQuery
  )

  const {
    query: {
      categorySlug
    }
  } = useRouter()

  useSearchSortArguments((params) => loadQuery(params))

  return (
    <>
      <RootSearchRichObject />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          categorySlug: categorySlug as string,
          sortBy: 'TOP'
        })}
        >
          <Suspense fallback={<SkeletonStack />}>
            <SearchCategory query={queryRef as PreloadedQuery<SearchCategoryQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootSearchCategory
