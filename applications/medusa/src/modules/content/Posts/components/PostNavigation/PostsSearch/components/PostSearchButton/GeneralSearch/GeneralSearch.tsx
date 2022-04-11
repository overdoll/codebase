import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Suspense } from 'react'
import SkeletonRectangleGrid from '../../../../../../../Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import { useQueryParams } from 'use-query-params'
import QueryErrorBoundary from '../../../../../../../Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SearchInput, SearchProvider, useSearch } from '../../../../../../../HookedComponents/Search'
import SearchChoices from './SearchChoices/SearchChoices'
import { configMap, GeneralSearchProps } from '../../../constants'
import { Stack } from '@chakra-ui/react'

interface Props {
  routeTo: string
  onClose: () => void
}

export default function GeneralSearch ({
  routeTo,
  onClose
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const [query] = useQueryParams(configMap)

  const getPrimaryCharacter = (): Array<string[] | string> => {
    if (query.characters == null) {
      return []
    }

    if (Object.keys(query.characters).length < 1) {
      return []
    }

    const character = Object.keys(query.characters)[0]

    return [[character], query.characters[character] as string]
  }

  //

  const searchMethods = useSearch<GeneralSearchProps>({
    defaultValue: {
      search: null,
      first: 5,
      seriesSlugs: query.series != null ? query.series as string[] : null,
      categoriesSlugs: query.categories != null ? query.categories as string[] : null,
      charactersSlugs: getPrimaryCharacter() != null ? getPrimaryCharacter()[0] as string[] : null,
      charactersSeriesSlug: getPrimaryCharacter() != null ? getPrimaryCharacter()[1] as string : null
    }
  })

  const {
    loadQuery,
    register
  } = searchMethods

  return (
    <SearchProvider {...searchMethods}>
      <Stack spacing={2}>
        <SearchInput
          {...register('search', 'set')}
          size='lg'
          variant='outline'
          placeholder={i18n._(t`Search for characters, categories, or series`)}
        />
        <Suspense fallback={<SkeletonRectangleGrid />}>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <SearchChoices routeTo={routeTo} onClose={onClose} />
          </QueryErrorBoundary>
        </Suspense>
      </Stack>
    </SearchProvider>
  )
}
