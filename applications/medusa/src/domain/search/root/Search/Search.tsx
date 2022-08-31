import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Suspense } from 'react'
import { HStack, Stack } from '@chakra-ui/react'
import { SearchInput, useSearch } from '@//:modules/content/HookedComponents/Search'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import SearchResults
  from '../../../../common/components/PageHeader/SearchButton/components/SearchBody/SearchResults/SearchResults'
import {
  RecommendationsSkeleton,
  SlideSkeleton
} from '@//:common/components/PageHeader/SearchButton/components/SearchSkeleton/SearchSkeleton'
import SearchRecommendations
  from '../../../../common/components/PageHeader/SearchButton/components/SearchBody/SearchRecommendations/SearchRecommendations'
import { useQueryParam } from 'use-query-params'
import { PageProps } from '@//:types/app'
import { useHistoryDisclosure } from '@//:modules/hooks'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import PageWrapperDesktop from '../../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import SearchRichObject from '../../../../common/rich-objects/search/SearchRichObject/SearchRichObject'

interface SearchProps {
  search: string
}

const Search: PageProps<{}> = (): JSX.Element => {
  const { i18n } = useLingui()

  const [search] = useQueryParam<string | null | undefined>('q')

  const methods = useHistoryDisclosure({ hash: 'search' })

  const searchMethods = useSearch<SearchProps>({
    defaultValue: {
      search: search ?? ''
    }
  })

  const recommendationMethods = useSearch<{}>({})

  const {
    loadQuery: loadSearchQuery,
    register,
    searchArguments
  } = searchMethods

  const {
    loadQuery: loadRecommendationsQuery,
    searchArguments: recommendationArguments
  } = recommendationMethods

  return (
    <>
      {SearchRichObject(searchArguments.variables.search ?? '')}
      <PageWrapperDesktop>
        <HistoryDisclosureProvider {...methods}>
          <Stack spacing={8}>
            <Stack spacing={8} overflow='hidden'>
              <Stack spacing={4}>
                <HStack justify='space-between' align='center' spacing={2}>
                  <SearchInput
                    {...register('search', 'set')}
                    size='lg'
                    variant='filled'
                    placeholder={i18n._(t`Search for a club, character, category, or series`)}
                  />
                </HStack>
                <Suspense fallback={(
                  <SlideSkeleton />
                )}
                >
                  <QueryErrorBoundary loadQuery={loadSearchQuery}>
                    <SearchResults searchArguments={searchArguments} />
                  </QueryErrorBoundary>
                </Suspense>
              </Stack>
              <Suspense fallback={(
                <RecommendationsSkeleton />
              )}
              >
                <QueryErrorBoundary loadQuery={loadRecommendationsQuery}>
                  <SearchRecommendations searchArguments={recommendationArguments} />
                </QueryErrorBoundary>
              </Suspense>
            </Stack>
          </Stack>
        </HistoryDisclosureProvider>
      </PageWrapperDesktop>
    </>
  )
}

export default Search
