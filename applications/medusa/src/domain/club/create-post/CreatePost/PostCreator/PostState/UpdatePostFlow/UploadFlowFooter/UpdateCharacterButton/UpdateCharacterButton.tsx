import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateCharacterButtonFragment$key } from '@//:artifacts/UpdateCharacterButtonFragment.graphql'
import type { UpdateCharacterButtonMutation } from '@//:artifacts/UpdateCharacterButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import compareTwoArrays from '@//:modules/support/compareTwoArrays'
import { t, Trans } from '@lingui/macro'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { isFailed } from '../../UploadFlowHeader/ProcessContent/RefreshProcessContent/RefreshProcessContent'

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
    content {
      resource {
        processed
        failed
      }
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
          banner {
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

  const { state } = useSequenceContext()

  const [updateCharacter, isUpdatingCharacter] = useMutation<UpdateCharacterButtonMutation>(Mutation)

  const notify = useToast()

  const contentFailed = isFailed(data.content)

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
        if (contentFailed) return
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

  if (contentFailed) {
    return (
      <Button isDisabled size='lg'>
        <Trans>
          Processing Failed
        </Trans>
      </Button>
    )
  }

  return (
    <FlowBuilderNextButton isDisabled={buttonDisabled}>
      {buttonDisabled ? `${(Object.keys(state.characters)).length} / 1` : undefined}
    </FlowBuilderNextButton>
  )
}
