import { ReactNode, Suspense } from 'react'
import { Collapse, HStack, Stack } from '@chakra-ui/react'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import UploadSearchCategoriesMultiSelector
  from './UploadSearchCategoriesMultiSelector/UploadSearchCategoriesMultiSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SkeletonUploadCategoryGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadCategoryGrid/SkeletonUploadCategoryGrid'
import { SearchSmall } from '@//:assets/icons'
import SearchHeader
  from '@//:common/components/PageHeader/SearchButton/components/SearchBody/SearchHeader/SearchHeader'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { UploadSearchCategoriesMultiSelectorProps } from '../UploadCategoryStep'

interface Props extends ComponentChoiceArguments<UploadSearchCategoriesMultiSelectorProps> {
  rightSearchComponent: ReactNode
}

interface SearchProps {
  title: string
}

export default function UploadSearchCategories ({
  rightSearchComponent,
  register
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const {
    searchArguments,
    loadQuery,
    register: registerSearch
  } = useSearch<SearchProps>({
    defaultValue: {
      title: ''
    }
  })

  return (
    <Stack spacing={2}>
      <HStack spacing={2} justify='space-between'>
        <SearchInput
          {...registerSearch('title', 'change')}
          placeholder={i18n._(t`Search for a category`)}
        />
        {rightSearchComponent}
      </HStack>
      <Collapse in={searchArguments.variables.title !== ''}>
        <Stack spacing={2}>
          <SearchHeader icon={SearchSmall}>
            <Trans>
              Search Results
            </Trans>
          </SearchHeader>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonUploadCategoryGrid />}>
              <UploadSearchCategoriesMultiSelector
                searchArguments={searchArguments}
                register={register}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </Collapse>
    </Stack>
  )
}
