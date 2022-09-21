import { Suspense } from 'react'
import { Flex, Stack, Text } from '@chakra-ui/react'
import {
  MobileContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import RequiredPrompt from './RequiredPrompt/RequiredPrompt'
import { Trans } from '@lingui/macro'
import UploadAudiencesSingleSelector from './UploadAudiencesSingleSelector/UploadAudiencesSingleSelector'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import SkeletonUploadAudienceGrid
  from '@//:modules/content/Placeholder/Loading/SkeletonUploadAudienceGrid/SkeletonUploadAudienceGrid'
import Head from 'next/head'

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
    <MobileContainer>
      <Head>
        <title>
          Select Audience - overdoll
        </title>
      </Head>
      <Stack spacing={2}>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              What does the content contain?
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Select the most relevant description of what is depicted in your content. You can only select one.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<SkeletonUploadAudienceGrid />}>
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
    </MobileContainer>
  )
}
