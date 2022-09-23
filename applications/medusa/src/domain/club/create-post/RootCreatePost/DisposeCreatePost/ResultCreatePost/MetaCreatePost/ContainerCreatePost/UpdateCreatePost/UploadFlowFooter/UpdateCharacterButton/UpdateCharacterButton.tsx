import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateCharacterButtonFragment$key } from '@//:artifacts/UpdateCharacterButtonFragment.graphql'
import type { UpdateCharacterButtonMutation } from '@//:artifacts/UpdateCharacterButtonMutation.graphql'
import compareTwoArrays from '@//:modules/support/compareTwoArrays'
import { t } from '@lingui/macro'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: UpdateCharacterButtonFragment$key
  nextStep: () => void
}

const Fragment = graphql`
  fragment UpdateCharacterButtonFragment on Post {
    id
    characters {
      id
    }
  }
`

const Mutation = graphql`
  mutation UpdateCharacterButtonMutation ($input: UpdatePostCharactersInput!) {
    updatePostCharacters(input: $input) {
      post {
        id
        characters {
          id
          name
          series {
            title
          }
          slug
        }
      }
    }
  }
`
export default function UpdateCharacterButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { state } = useSequenceContext()

  const [updateCharacter, isUpdatingCharacter] = useMutation<UpdateCharacterButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (Object.keys(state.characters)).length < 1

  const hasUpdate = (): boolean => {
    const currentCharacters = data?.characters.map((item) => item.id)
    const stateCharacters = Object.keys(state.characters)

    return compareTwoArrays(currentCharacters, stateCharacters) === false
  }

  const onUpdateCharacter = (): void => {
    const currentCharacters = Object.keys(state.characters)

    updateCharacter({
      variables: {
        input: {
          id: data.id,
          characterIds: currentCharacters
        }
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the characters`
        })
      }
    })
  }

  if (hasUpdate() && Object.keys(state.characters).length > 0) {
    return (
      <FlowBuilderSaveButton
        isDisabled={buttonDisabled}
        isLoading={isUpdatingCharacter}
        onClick={onUpdateCharacter}
      />
    )
  }

  return (
    <FlowBuilderNextButton isDisabled={buttonDisabled}>
      {buttonDisabled ? `${(Object.keys(state.characters)).length} / 1` : undefined}
    </FlowBuilderNextButton>
  )
}
