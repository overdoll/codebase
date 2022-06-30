import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Suspense } from 'react'
import { HStack, Stack } from '@chakra-ui/react'
import { SearchInput, useSearch } from '@//:modules/content/HookedComponents/Search'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import SearchResults from './SearchResults/SearchResults'
import { RecommendationsSkeleton, SlideSkeleton } from '../SearchSkeleton/SearchSkeleton'
import SearchRecommendations from './SearchRecommendations/SearchRecommendations'

interface Props {
  closeButtonRef: any
}

interface SearchProps {
  search: string
}

export default function SearchBody (props: Props): JSX.Element {
  const { i18n } = useLingui()

  const disclosureMethods = useHistoryDisclosureContext()

  const searchMethods = useSearch<SearchProps>({
    defaultValue: {
      search: ''
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

  const { onClose } = disclosureMethods

  return (
    <Stack spacing={8}>
      <Stack spacing={8}>
        <Stack spacing={4}>
          <HStack justify='space-between' align='center' spacing={2}>
            <SearchInput
              {...register('search', 'set')}
              size='lg'
              variant='filled'
              placeholder={i18n._(t`Search for a club, character, category, or series`)}
            />
            <CloseButton ref={props.closeButtonRef} bg='gray.800' size='lg' onClick={onClose} />
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
  )
}
