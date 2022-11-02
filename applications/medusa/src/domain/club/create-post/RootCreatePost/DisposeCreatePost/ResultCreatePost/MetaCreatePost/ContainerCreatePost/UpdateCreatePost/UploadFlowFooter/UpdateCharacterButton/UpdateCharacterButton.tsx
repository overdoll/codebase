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
    characterRequests {
      id
      name
    }
  }
`

const Mutation = graphql`
  mutation UpdateCharacterButtonMutation ($charactersInput: UpdatePostCharactersInput!, $characterRequestsInput: UpdatePostCharacterRequestsInput!) {
    updatePostCharacters(input: $charactersInput) {
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
    updatePostCharacterRequests(input: $characterRequestsInput) {
      post {
        id
        characterRequests {
          id
          name
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

  const stateCharacters = Object.keys(state.characters).filter((key) => state.characters[key].isRequest === false)
  const currentCharacters = data?.characters.map((item) => item.id)

  const stateRequestCharacters = Object.keys(state.characters).filter((key) => state.characters[key].isRequest === true)
  const currentRequestCharacters = data?.characterRequests.map((item) => item.name)

  const hasUpdate = (): boolean => {
    const doCharactersNeedUpdate = compareTwoArrays(currentCharacters, stateCharacters) === false
    const doRequestCharactersNeedUpdate = compareTwoArrays(currentRequestCharacters, stateRequestCharacters) === false

    return doCharactersNeedUpdate || doRequestCharactersNeedUpdate
  }

  const onUpdateCharacter = (): void => {
    updateCharacter({
      variables: {
        charactersInput: {
          id: data.id,
          characterIds: stateCharacters
        },
        characterRequestsInput: {
          id: data.id,
          characterRequests: stateRequestCharacters.map((item) => ({ name: item }))
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
