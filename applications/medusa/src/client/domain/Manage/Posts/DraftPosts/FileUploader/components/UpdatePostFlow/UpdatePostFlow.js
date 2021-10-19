/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'
import type {
  CharacterRequest,
  StepsMutation
} from '@//:artifacts/StepsMutation.graphql'
import type { Dispatch, State } from '@//:types/upload'
import {
  useToast, Flex, Spacer, Center, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

/*

const SubmitGraphQL = graphql`
  mutation StepsMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      review
      post {
        id
      }
    }
  }
`

 */

// Stepper - handles all stepping functions
export default function UpdatePostFlow ({ uppy, state, dispatch }: Props): Node {
  // const [commit, isInFlight] = useMutation<StepsMutation>(SubmitGraphQL)

  const commit = () => {
    return null
  }
  const isInFlight = true

  const notify = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [t] = useTranslation('general')

  const [u] = useTranslation('upload')

  // Tagging step - disabled if the conditions aren't met
  const NextDisabled =
    state.step === STEPS.TAG &&
    (Object.keys(state.characters).length < 1 ||
      Object.keys(state.artist).length < 1 ||
      Object.keys(state.categories).length < 3)

  // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
  const SubmitDisabled = state.files.length !== Object.keys(state.urls).length

  const Step = (): Node => {
    switch (state.step) {
      case STEPS.ARRANGE:

        // <Arrange uppy={uppy} dispatch={dispatch} state={state} />

      case STEPS.TAG:

        // <Tag disabled={NextDisabled} dispatch={dispatch} state={state} />

      case STEPS.REVIEW:

        // Review disabled={SubmitDisabled} state={state} /

      case STEPS.FINISH:

        // <Finish state={state} />

      default:

      // <Begin uppy={uppy} />
    }
  }

  const NextStep = (): void => {
    switch (state.step) {
      case STEPS.ARRANGE:
        dispatch({ type: EVENTS.STEP, value: STEPS.TAG })
        break
      case STEPS.TAG:
        dispatch({ type: EVENTS.STEP, value: STEPS.REVIEW })
        break
      default:
        break
    }
  }

  const PrevStep = (): void => {
    switch (state.step) {
      case STEPS.TAG:
        dispatch({ type: EVENTS.STEP, value: STEPS.ARRANGE })
        break
      case STEPS.REVIEW:
        dispatch({ type: EVENTS.STEP, value: STEPS.TAG })
        break
      default:
        break
    }
  }

  // onSubmit - submit post
  const onSubmit = (): void => {
    const urls: Array<string> = []

    // make sure our urls keep their order
    state.files.forEach((file) => {
      // get actual upload ID
      const url = state.urls[file.id].split('/').slice(-1)[0]

      urls.push(url)
    })

    const characterRequests: Array<CharacterRequest> = []
    const mediaRequests: Array<string> = []

    // Sort all characters - if they're a requested character, then filter them out
    // also filter them out if the media is requested
    const characters = Object.keys(state.characters).filter((item) => {
      const character = state.characters[item]

      // if the media is custom, use the name. otherwise use the id
      // the check is done on the backend against mediaRequests
      if (character.request) {
        const request = {
          name: character.name
        }

        if (character.media.request) {
          request.customMediaName = character.media.title
        } else {
          request.existingMediaId = character.media.id
        }

        characterRequests.push(request)
      }

      // if the media is requested, add it to our list
      if (character.media.request) {
        mediaRequests.push(character.media.title)
      }

      return !(character.media.request || character.request)
    })

    commit({
      variables: {
        input: {
          customArtistUsername: state.artist.username ?? '',
          existingArtist: state.artist.id,
          categoryIds: Object.keys(state.categories),
          characterIds: characters,
          content: urls,
          characterRequests: characterRequests,
          mediaRequests: mediaRequests
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.SUBMIT, value: data.post })
      },
      onError (data) {
        const message = JSON.parse(data?.message)
        notify({
          status: 'error',
          title: message[0].message,
          isClosable: true
        })
      }
    })
  }

  // Cleanup - reset uppy uploads and state
  const onCancel = () => {
    onClose()
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
  }

  return (
    <>post flow</>
  )
}
