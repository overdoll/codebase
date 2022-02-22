import { Box, Stack } from '@chakra-ui/react'
import { Suspense } from 'react'
import SkeletonStack from '../../../../../../../../../modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageSectionDescription, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import AudienceMultiSelector from './AudienceMultiSelector/AudienceMultiSelector'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface ChoiceProps {
  title: string
}

export default function AudiencesCurationStep (): JSX.Element {
  const {
    state,
    dispatch
  } = useSequenceContext()

  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  const {
    values,
    removeValue,
    register
  } = useChoice<ChoiceProps>({
    defaultValue: state.audience,
    onChange: (props) => dispatch({
      type: 'audience',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <Box>
      <PageSectionWrap>
        <PageSectionDescription>
          <Trans>
            An "audience" can also be called a "preference". Select the type of targeted content you are only interested
            in seeing. Leaving other options unselected tells us you don't want to see this content at all.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <Stack spacing={2}>
        <ChoiceRemovableTags values={values} removeValue={removeValue} titleKey='title' />
        <Box maxH='60vh' overflowY='auto'>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <AudienceMultiSelector searchArguments={searchArguments} register={register} />
            </Suspense>
          </QueryErrorBoundary>
        </Box>
      </Stack>
    </Box>
  )
}
