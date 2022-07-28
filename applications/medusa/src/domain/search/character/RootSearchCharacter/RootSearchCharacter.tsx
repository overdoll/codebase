import { Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { SearchCharacterQuery as SearchCharacterQueryType } from '@//:artifacts/SearchCharacterQuery.graphql'
import SearchCharacterQuery from '@//:artifacts/SearchCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import SearchCharacter from './SearchCharacter/SearchCharacter'
import useSearchSortArguments
  from '../../../../common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  queryRefs: {
    searchCharacterQuery: PreloadedQuery<SearchCharacterQueryType>
  }
}

const RootSearchCharacter: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<SearchCharacterQueryType>(
    SearchCharacterQuery,
    props.queryRefs.searchCharacterQuery
  )

  const {
    query: {
      seriesSlug,
      characterSlug
    }
  } = useRouter()

  useSearchSortArguments((params) => loadQuery(params))

  return (
    <>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          seriesSlug: seriesSlug as string,
          characterSlug: characterSlug as string,
          sortBy: 'TOP'
        })}
        >
          <Suspense fallback={<SkeletonStack />}>
            <SearchCharacter query={queryRef as PreloadedQuery<SearchCharacterQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootSearchCharacter
