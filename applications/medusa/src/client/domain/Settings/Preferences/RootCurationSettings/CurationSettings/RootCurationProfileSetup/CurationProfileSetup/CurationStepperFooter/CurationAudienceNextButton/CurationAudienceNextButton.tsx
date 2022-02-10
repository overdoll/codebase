import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { HStack, useToast } from '@chakra-ui/react'
import type { CurationAudienceNextButtonFragment$key } from '@//:artifacts/CurationAudienceNextButtonFragment.graphql'
import { compareTwoArrays } from '@//:modules/support'
import { FlowBuilderNextButton, FlowBuilderSaveButton, FlowBuilderSkipButton } from '@//:modules/content/PageLayout'

interface Props {
  nextStep: () => void
  query: CurationAudienceNextButtonFragment$key | null
}

const Fragment = graphql`
  fragment CurationAudienceNextButtonFragment on AudienceCurationProfile {
    audiences {
      id
    }
  }
`

const Mutation = graphql`
  mutation CurationAudienceNextButtonMutation($audienceIds: [ID!]!, $skipped: Boolean!) {
    updateCurationProfileAudience(input: {audienceIds: $audienceIds, skipped: $skipped}) {
      curationProfile {
        id
        completed
        audience {
          skipped
          completed
          audiences {
            id
          }
        }
      }
    }
  }
`

export default function CurationAudienceNextButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateAudience, isUpdatingAudience] = useMutation(Mutation)

  const state = useContext(StateContext)

  const dispatch = useContext(DispatchContext)

  const notify = useToast()

  const currentAudienceIds = data?.audiences.map((item) => item.id) ?? []
  console.log(currentAudienceIds)

  const saveCondition = Object.keys(state.audience.value).length > 0 &&
    compareTwoArrays(Object.keys(state.audience.value), currentAudienceIds) === false

  const onUpdateAudience = (): void => {
    updateAudience({
      variables: {
        audienceIds: Object.keys(state.audience.value),
        skipped: false
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audiences`,
          isClosable: true
        })
      }
    })
  }

  const onSkipAudience = (): void => {
    updateAudience({
      variables: {
        audienceIds: [],
        skipped: true
      },
      onCompleted () {
        dispatch({
          type: 'audience',
          value: {}
        })
        notify({
          status: 'info',
          title: t`Audience preference was skipped`,
          isClosable: true
        })
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error skipping audience`,
          isClosable: true
        })
      }
    })
  }

  const NextButton = (): JSX.Element => {
    if (saveCondition) {
      return (
        <FlowBuilderSaveButton
          isLoading={isUpdatingAudience}
          onClick={onUpdateAudience}
        />
      )
    }
    return <FlowBuilderNextButton />
  }

  return (
    <HStack spacing={2}>
      <FlowBuilderSkipButton
        isLoading={isUpdatingAudience}
        onClick={onSkipAudience}
      />
      <NextButton />
    </HStack>
  )
}
