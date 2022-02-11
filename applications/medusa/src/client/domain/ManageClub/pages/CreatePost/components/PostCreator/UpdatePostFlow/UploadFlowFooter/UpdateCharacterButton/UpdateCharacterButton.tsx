import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateCharacterButtonFragment$key } from '@//:artifacts/UpdateCharacterButtonFragment.graphql'
import type { UpdateCharacterButtonMutation } from '@//:artifacts/UpdateCharacterButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { compareTwoArrays } from '@//:modules/support'
import { t, Trans } from '@lingui/macro'
import { useContext } from 'react'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useToast } from '@//:modules/content/ThemeComponents'
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
          thumbnail {
            type
            urls {
              mimeType
              url
            }
          }
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

  const state = useContext(StateContext)

  const [updateCharacter, isUpdatingCharacter] = useMutation<UpdateCharacterButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (Object.keys(state.characters.value)).length < 1 || state.isProcessing.value

  const hasUpdate = (): boolean => {
    const currentCharacters = data?.characters.map((item) => item.id)
    const stateCharacters = Object.keys(state.characters.value)

    return compareTwoArrays(currentCharacters, stateCharacters) === false
  }

  const onUpdateCharacter = (): void => {
    const currentCharacters = Object.keys(state.characters.value)

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

  if (state.isProcessing.value === true) {
    return (
      <Button isLoading size='lg'>
        <Trans>
          Processing
        </Trans>
      </Button>
    )
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
    <FlowBuilderNextButton isDisabled={buttonDisabled} />
  )
}
