import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { HStack } from '@chakra-ui/react'
import type { CurationAudienceNextButtonFragment$key } from '@//:artifacts/CurationAudienceNextButtonFragment.graphql'
import compareTwoArrays from '@//:modules/support/compareTwoArrays'
import { FlowBuilderNextButton, FlowBuilderSaveButton, FlowBuilderSkipButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

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

  const {
    state,
    dispatch
  } = useSequenceContext()

  const notify = useToast()

  const currentAudienceIds = data?.audiences.map((item) => item.id) ?? []

  const saveCondition = Object.keys(state.audience).length > 0 &&
    compareTwoArrays(Object.keys(state.audience), currentAudienceIds) === false

  const onUpdateAudience = (): void => {
    updateAudience({
      variables: {
        audienceIds: Object.keys(state.audience),
        skipped: false
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the audiences`
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
          value: {},
          transform: 'SET'
        })
        notify({
          status: 'info',
          title: t`Audience preference was skipped`
        })
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error skipping audience`
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
