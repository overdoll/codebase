import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Box, Collapse, HStack, Stack } from '@chakra-ui/react'
import SearchInput from '@//:modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import UploadSearchCategoriesMultiSelector
  from './UploadSearchCategoriesMultiSelector/UploadSearchCategoriesMultiSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import UploadRewindCategories from './UploadRewindCategories/UploadRewindCategories'
import { graphql, useFragment } from 'react-relay/hooks'
import type { UploadCategoryStepFragment$key } from '@//:artifacts/UploadCategoryStepFragment.graphql'
import SkeletonUploadCategoryGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadCategoryGrid/SkeletonUploadCategoryGrid'
import { SearchSmall, TopicIdentifier } from '@//:assets/icons'
import SearchHeader
  from '../../../../../../../../../common/components/PageHeader/SearchButton/components/SearchBody/SearchHeader/SearchHeader'

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
  } = useSearch<SearchProps>({
    defaultValue: {
      title: ''
    }
  })

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
            Select the categories that would be most applicable to the content you have uploaded
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <HStack spacing={2} justify='space-between'>
        <SearchInput
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
      <Stack spacing={4}>
        <Collapse unmountOnExit in={searchArguments.variables.title !== ''}>
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
        <Stack spacing={2}>
          <SearchHeader icon={TopicIdentifier}>
            <Trans>
              Topics
            </Trans>
          </SearchHeader>
          <Box>
            topic query
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}
