import { Box, Stack } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import CategoryMultiSelector from './CategoryMultiSelector/CategoryMultiSelector'
import SearchInput
  from '../../../../../../../../../modules/content/HookedComponents/Search/components/SearchInput/SearchInput'
import { useLingui } from '@lingui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface SearchProps {
  title: string
}

interface ChoiceProps {
  title: string
}

export default function CategoriesCurationStep (): JSX.Element {
  const {
    state,
    dispatch
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
    defaultValue: state.category,
    onChange: (props) => dispatch({
      type: 'category',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <Box>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            Categories are a quick way to search for content. Select the categories you prefer to see the most. Leaving
            other categories blank will still show posts with those categories to you.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        <ChoiceRemovableTags
          values={values}
          removeValue={removeValue}
          titleKey='title'
        />
        <SearchInput
          {...registerSearch('title', 'change')}
          placeholder={i18n._(t`Search for a category`)}
        />
        <Box maxH='60vh' overflowY='auto'>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <CategoryMultiSelector
                searchArguments={searchArguments}
                register={register}
              />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
      </Stack>
    </Box>
  )
}
