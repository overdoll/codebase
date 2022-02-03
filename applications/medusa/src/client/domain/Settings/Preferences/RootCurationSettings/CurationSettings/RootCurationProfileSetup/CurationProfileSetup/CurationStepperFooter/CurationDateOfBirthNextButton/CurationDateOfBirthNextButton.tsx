import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useContext } from 'react'
import { StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { HStack, useToast } from '@chakra-ui/react'
import type {
  CurationDateOfBirthNextButtonFragment$key
} from '@//:artifacts/CurationDateOfBirthNextButtonFragment.graphql'
import { FlowBuilderNextButton } from '../../../../../../../../../../modules/content/PageLayout/FlowBuilder'
import differenceInYears from 'date-fns/differenceInYears'
import { FlowBuilderSaveButton, FlowBuilderSkipButton } from '@//:modules/content/PageLayout'

interface Props {
  nextStep: () => void
  query: CurationDateOfBirthNextButtonFragment$key | null
}

const Fragment = graphql`
  fragment CurationDateOfBirthNextButtonFragment on DateOfBirthCurationProfile {
    dateOfBirth
  }
`

const Mutation = graphql`
  mutation CurationDateOfBirthNextButtonMutation($dateOfBirth: Time, $skipped: Boolean!) {
    updateCurationProfileDateOfBirth(input: {dateOfBirth: $dateOfBirth, skipped: $skipped}) {
      curationProfile {
        id
        completed
        dateOfBirth {
          skipped
          completed
          dateOfBirth
        }
      }
    }
  }
`

export default function CurationDateOfBirthNextButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateDob, isUpdatingDob] = useMutation(Mutation)

  const state = useContext(StateContext)

  const notify = useToast()

  const enteredYears = differenceInYears(new Date(), new Date(state.dateOfBirth.value))
  const newYears = differenceInYears(new Date(), new Date(data?.dateOfBirth as Date))

  const saveCondition = state.dateOfBirth.value != null && enteredYears !== newYears

  const onUpdateDob = (): void => {
    updateDob({
      variables: {
        dateOfBirth: state.dateOfBirth.value,
        skipped: false
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the date of birth`,
          isClosable: true
        })
      }
    })
  }

  const onSkipDob = (): void => {
    updateDob({
      variables: {
        skipped: true
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error skipping the date of birth`,
          isClosable: true
        })
      }
    })
  }

  const NextButton = (): JSX.Element => {
    if (saveCondition) {
      return (
        <FlowBuilderSaveButton
          onClick={onUpdateDob}
          isLoading={isUpdatingDob}
        />
      )
    }
    return (
      <FlowBuilderNextButton />
    )
  }

  return (
    <HStack spacing={2}>
      <FlowBuilderSkipButton
        onClick={onSkipDob}
        isLoading={isUpdatingDob}
      />
      <NextButton />
    </HStack>
  )
}
