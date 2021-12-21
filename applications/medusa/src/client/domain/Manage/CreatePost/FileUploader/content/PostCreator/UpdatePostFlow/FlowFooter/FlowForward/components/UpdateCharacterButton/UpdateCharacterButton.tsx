import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateCharacterButtonFragment$key } from '@//:artifacts/UpdateCharacterButtonFragment.graphql'
import type { UpdateCharacterButtonMutation } from '@//:artifacts/UpdateCharacterButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { compareTwoArrays } from '@//:modules/support'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: UpdateCharacterButtonFragment$key
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
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateCharacter, isUpdatingCharacter] = useMutation<UpdateCharacterButtonMutation>(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const buttonDisabled = (Object.keys(state.characters)).length < 1

  const checkUpdate = (): void => {
    const currentCharacters = data?.characters.map((item) => item.id)
    const stateCharacters = Object.keys(state.characters)

    if (compareTwoArrays(currentCharacters, stateCharacters) === false) {
      onUpdateCharacter()
      return
    }
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.REVIEW
    })
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
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.REVIEW
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.character.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={buttonDisabled}
      isLoading={isUpdatingCharacter}
      onClick={checkUpdate}
    >{t('create_post.flow.steps.footer.forward')}
    </Button>
  )
}
