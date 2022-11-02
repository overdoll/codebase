import { Box, HStack } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import type { UploadFlowFooterFragment$key } from '@//:artifacts/UploadFlowFooterFragment.graphql'
import { useFragment } from 'react-relay'
import { FlowBuilderPreviousButton } from '@//:modules/content/PageLayout'
import UpdateContentButton from './UpdateContentButton/UpdateContentButton'
import UpdateAudienceButton from './UpdateAudienceButton/UpdateAudienceButton'
import UpdateCategoryButton from './UpdateCategoryButton/UpdateCategoryButton'
import UpdateCharacterButton from './UpdateCharacterButton/UpdateCharacterButton'
import SubmitPostButton from './SubmitPostButton/SubmitPostButton'
import { useContext } from 'react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  query: UploadFlowFooterFragment$key
  step: string
  isAtStart: boolean
  nextStep: () => void
}

const Fragment = graphql`
  fragment UploadFlowFooterFragment on Post {
    ...UpdateAudienceButtonFragment
    ...UpdateCategoryButtonFragment
    ...UpdateCharacterButtonFragment
    ...SubmitPostButtonFragment
    ...UpdateContentButtonFragment
  }
`

export default function UploadFlowFooter ({
  query,
  step,
  isAtStart,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    previousStep,
    currentStep
  } = useContext(FlowContext)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const onPrevious = (): void => {
    if (state.deepValue != null) {
      dispatch({
        type: 'deepValue',
        value: null,
        transform: 'SET'
      })
      return
    }
    previousStep()
  }

  const NextButton = (): JSX.Element => {
    switch (step) {
      case 'content':
        return (
          <UpdateContentButton query={data} />
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

  useUpdateEffect(() => {
    dispatch({
      type: 'deepValue',
      value: null,
      transform: 'SET'
    })
  }, [currentStep])

  return (
    <HStack w='100%' justify='space-between' spacing={2}>
      {isAtStart ? <Box /> : <FlowBuilderPreviousButton onClick={onPrevious} />}
      <NextButton />
    </HStack>
  )
}
