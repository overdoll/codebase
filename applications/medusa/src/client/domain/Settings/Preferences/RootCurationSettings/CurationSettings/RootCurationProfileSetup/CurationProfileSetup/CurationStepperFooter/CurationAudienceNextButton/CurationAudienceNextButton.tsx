import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { HStack, useToast } from '@chakra-ui/react'
import type { CurationAudienceNextButtonFragment$key } from '@//:artifacts/CurationAudienceNextButtonFragment.graphql'
import { FlowBuilderNextButton } from '../../../../../../../../../components/FlowBuilder'
import { compareTwoArrays } from '@//:modules/support'

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
        <Button
          onClick={onUpdateAudience}
          colorScheme='green'
          isLoading={isUpdatingAudience}
          size='lg'
        >
          <Trans>
            Save
          </Trans>
        </Button>
      )
    }
    return <FlowBuilderNextButton />
  }

  return (
    <HStack spacing={2}>
      <Button
        onClick={onSkipAudience}
        variant='ghost'
        colorScheme='gray'
        isLoading={isUpdatingAudience}
        size='lg'
      >
        <Trans>
          Skip
        </Trans>
      </Button>
      <NextButton />
    </HStack>
  )
}
