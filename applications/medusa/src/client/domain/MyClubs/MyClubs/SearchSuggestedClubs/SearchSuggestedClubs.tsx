import SuggestedClubs from './SuggestedClubs/SuggestedClubs'
import { Suspense } from 'react'
import { t } from '@lingui/macro'
import SearchInput from '../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import SkeletonRectangleGrid
  from '../../../../../modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

interface SearchProps {
  search: string
}

export default function SearchSuggestedClubs (): JSX.Element {
  const {
    searchArguments,
    loadQuery,
    register
  } = useSearch<SearchProps>({})

  const { i18n } = useLingui()

  return (
    <Stack spacing={2}>
      <SearchInput
        {...register('search')}
        placeholder={i18n._(t`Search for a club by name`)}
      />
      <QueryErrorBoundary
        loadQuery={loadQuery}
      >
        <Suspense fallback={<SkeletonRectangleGrid />}>
          <SuggestedClubs searchArguments={searchArguments} />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
