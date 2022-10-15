import { t } from '@lingui/macro'
import { graphql, useMutation } from 'react-relay/hooks'
import { FlowBuilderNextButton } from '@//:modules/content/PageLayout/FlowBuilder'
import { FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  nextStep: () => void
}

const Mutation = graphql`
  mutation CurationProfileDateOfBirthButtonMutation($dateOfBirth: Time, $skipped: Boolean!) {
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

export default function CurationProfileDateOfBirthButton (props: Props): JSX.Element {
  const {
    nextStep
  } = props

  const [updateDob, isUpdatingDob] = useMutation(Mutation)

  const { state } = useSequenceContext()

  const notify = useToast()

  const saveCondition = state.dateOfBirth != null

  const onUpdateDob = (): void => {
    updateDob({
      variables: {
        dateOfBirth: state.dateOfBirth,
        skipped: false
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the date of birth`
        })
      }
    })
  }

  if (saveCondition) {
    return (
      <FlowBuilderSaveButton
        onClick={onUpdateDob}
        isLoading={isUpdatingDob}
      />
    )
  }
  return (
    <FlowBuilderNextButton
      isDisabled={state.dateOfBirth == null}
    />
  )
}
