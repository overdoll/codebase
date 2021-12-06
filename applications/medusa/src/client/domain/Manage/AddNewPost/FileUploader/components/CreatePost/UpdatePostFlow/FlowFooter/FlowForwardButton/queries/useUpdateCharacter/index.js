/**
 * @flow
 */

import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { useUpdateCharacterFragment$key } from '@//:artifacts/useUpdateCharacterFragment.graphql'
import { graphql, useMutation } from 'react-relay/hooks'
import type useUpdateCharacterMutation from '@//:artifacts/useUpdateCharacterMutation.graphql'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: useUpdateCharacterFragment$key
}

const Fragment = graphql`
  fragment useUpdateCharacterFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation useUpdateCharacterMutation ($input: UpdatePostCharactersInput!) {
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

export default function useUpdateCharacter ({ uppy, dispatch, state, query }: Props) {
  const data = useFragment(Fragment, query)

  const [updateCharacter, isUpdatingCharacter] = useMutation<useUpdateCharacterMutation>(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onUpdateCharacter = () => {
    const currentCharacters = Object.keys(state.characters)

    updateCharacter({
      variables: {
        input: {
          id: data.id,
          characterIds: currentCharacters
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.STEP, value: STEPS.REVIEW })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('posts.flow.steps.character.query.error'),
          isClosable: true
        })
      }
    })
  }

  return [onUpdateCharacter, isUpdatingCharacter]
}
