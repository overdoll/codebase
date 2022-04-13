import { Suspense } from 'react'
import {
  FlowBuilderScrollableContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Stack } from '@chakra-ui/react'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SkeletonRectangleGrid from '@//:modules/content/Placeholder/Loading/SkeletonRectangleGrid/SkeletonRectangleGrid'
import UploadSearchCategoriesMultiSelector
  from './UploadSearchCategoriesMultiSelector/UploadSearchCategoriesMultiSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface SearchProps {
  title: string
}

interface ChoiceProps {
  title: string
}

export default function UploadCategoryStep (): JSX.Element {
  const {
    dispatch,
    state
  } = useSequenceContext()

  const { i18n } = useLingui()

  const {
    searchArguments,
    loadQuery,
    register: registerSearch
  } = useSearch<SearchProps>({})

  const {
    values,
    register,
    removeValue
  } = useChoice<ChoiceProps>({
    defaultValue: state.categories,
    onChange: (props) => dispatch({
      type: 'categories',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <Stack spacing={2}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Add some categories
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Select the categories that would be most applicable to the content you have uploaded.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <SearchInput
        {...registerSearch('title', 'change')}
        placeholder={i18n._(t`Search for a category`)}
      />
      <ChoiceRemovableTags
        titleKey='title'
        values={values}
        removeValue={removeValue}
      />
      <FlowBuilderScrollableContainer>
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<SkeletonRectangleGrid />}>
            <UploadSearchCategoriesMultiSelector
              searchArguments={searchArguments}
              register={register}
            />
          </Suspense>
        </QueryErrorBoundary>
      </FlowBuilderScrollableContainer>
    </Stack>
  )
}
