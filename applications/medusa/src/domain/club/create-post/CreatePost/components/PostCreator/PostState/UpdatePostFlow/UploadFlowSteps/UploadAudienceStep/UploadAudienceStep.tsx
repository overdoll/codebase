import { Suspense } from 'react'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import RequiredPrompt from '../../../../../RequiredPrompt/RequiredPrompt'
import { Trans } from '@lingui/macro'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import UploadAudiencesSingleSelector from './UploadAudiencesSingleSelector/UploadAudiencesSingleSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface ChoiceProps {
  title: string
}

export default function UploadAudienceStep (): JSX.Element {
  const {
    state,
    dispatch
  } = useSequenceContext()

  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({})

  const { register } = useChoice<ChoiceProps>({
    defaultValue: state.audience,
    onChange: (props) => dispatch({
      type: 'audience',
      value: props,
      transform: 'SET'
    }),
    max: 1
  })

  return (
    <Stack spacing={2}>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Who is the target audience?
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            The audience is the group of people that you intended this post for. This will determine whether or not a
            user can see your post based on their set preferences. You can only select one audience.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <UploadAudiencesSingleSelector
            searchArguments={searchArguments}
            register={register}
          />
        </Suspense>
      </QueryErrorBoundary>
      <Flex justify='center'>
        <RequiredPrompt>
          <Text fontSize='sm' color='gray.100'>
            <Trans>
              Selecting an audience allows us to filter out content that someone would otherwise not prefer to see. We
              only show a person content they are interested in seeing.
            </Trans>
          </Text>
        </RequiredPrompt>
      </Flex>
    </Stack>
  )
}
