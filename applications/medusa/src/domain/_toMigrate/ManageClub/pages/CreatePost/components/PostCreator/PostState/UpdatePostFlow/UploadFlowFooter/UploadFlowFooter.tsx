import { Box, Flex, HStack } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import type { UploadFlowFooterFragment$key } from '@//:artifacts/UploadFlowFooterFragment.graphql'
import { useFragment } from 'react-relay'
import { FlowBuilderPreviousButton } from '@//:modules/content/PageLayout'
import UpdateContentButton from './UpdateContentButton/UpdateContentButton'
import UpdateAudienceButton from './UpdateAudienceButton/UpdateAudienceButton'
import UpdateCategoryButton from './UpdateCategoryButton/UpdateCategoryButton'
import UpdateCharacterButton from './UpdateCharacterButton/UpdateCharacterButton'
import SubmitPostButton from './SubmitPostButton/SubmitPostButton'

interface Props {
  query: UploadFlowFooterFragment$key
  step: string
  isAtStart: boolean
  nextStep: () => void
}

const Fragment = graphql`
  fragment UploadFlowFooterFragment on Post {
    ...UpdateContentButtonFragment
    ...UpdateAudienceButton
    ...UpdateCategoryButtonFragment
    ...UpdateCharacterButtonFragment
    ...SubmitPostButtonFragment
  }
`

export default function UploadFlowFooter ({
  query,
  step,
  isAtStart,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const NextButton = (): JSX.Element => {
    switch (step) {
      case 'arrange':
        return (
          <UpdateContentButton
            nextStep={nextStep}
            query={data}
          />
        )
      case 'audience':
        return (
          <UpdateAudienceButton
            nextStep={nextStep}
            query={data}
          />
        )
      case 'category':
        return (
          <UpdateCategoryButton
            nextStep={nextStep}
            query={data}
          />
        )
      case 'character':
        return (
          <UpdateCharacterButton
            nextStep={nextStep}
            query={data}
          />
        )
      case 'review':
        return (
          <SubmitPostButton
            query={data}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <Flex w='100%' bottom={0}>
      <HStack w='100%' justify='space-between' spacing={2}>
        {isAtStart ? <Box /> : <FlowBuilderPreviousButton />}
        <NextButton />
      </HStack>
    </Flex>
  )
}
