import SuggestedClubs from './SuggestedClubs/SuggestedClubs'
import { useSearchQueryArguments } from '@//:modules/hooks'
import { Suspense, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import SearchInput from '../../../../components/SearchInput/SearchInput'
import { Stack } from '@chakra-ui/react'
import SkeletonRectangleGrid
  from '../../../../../modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useLingui } from '@lingui/react'

export default function SearchSuggestedClubs (): JSX.Element {
  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ search: null })

  const [search, setSearch] = useState<string>('')

  const { i18n } = useLingui()

  useEffect(() => {
    setQueryArgs({ search: search })
  }, [search])

  return (
    <Stack spacing={2}>
      <SearchInput
        onChange={setSearch}
        placeholder={i18n._(t`Search for a club by name`)}
      />
      <QueryErrorBoundary
        loadQuery={() => setQueryArgs({ search: null })}
      >
        <Suspense fallback={<SkeletonRectangleGrid />}>
          <SuggestedClubs queryArgs={queryArgs} />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
