import { Box, Stack } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import CurationTopicsSelector from './CurationTopicsSelector/CurationTopicsSelector'

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

  const {
    searchArguments,
    loadQuery
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
            Categories are a quick way to search for content. We group categories by topics. Select a topic to see all
            available categories. Leaving
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
        <Box maxH='60vh' overflowY='auto'>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <CurationTopicsSelector searchArguments={searchArguments} register={register} />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
      </Stack>
    </Box>
  )
}
