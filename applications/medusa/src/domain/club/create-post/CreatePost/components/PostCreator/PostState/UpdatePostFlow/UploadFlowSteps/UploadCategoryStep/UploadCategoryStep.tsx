import { Suspense } from 'react'
import {
  FlowBuilderScrollableContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { HStack, Stack } from '@chakra-ui/react'
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
import UploadRewindCategories from './UploadRewindCategories/UploadRewindCategories'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadCategoryStepFragment$key } from '@//:artifacts/UploadCategoryStepFragment.graphql'

interface Props {
  query: UploadCategoryStepFragment$key
}

interface SearchProps {
  title: string
}

export interface UploadSearchCategoriesMultiSelectorProps {
  title: string
}

const Fragment = graphql`
  fragment UploadCategoryStepFragment on Post {
    ...UploadRewindCategoriesFragment
  }
`

export default function UploadCategoryStep ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

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
    removeValue,
    onChange
  } = useChoice<UploadSearchCategoriesMultiSelectorProps>({
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
            Select the categories that would be most applicable to the content you have uploaded. You must select a
            minimum of three to continue.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <HStack spacing={2} justify='space-between'>
        <SearchInput
          nullifyOnClear
          {...registerSearch('title', 'change')}
          placeholder={i18n._(t`Search for a category`)}
        />
        <UploadRewindCategories query={data} currentValues={values} onChange={onChange} />
      </HStack>
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
