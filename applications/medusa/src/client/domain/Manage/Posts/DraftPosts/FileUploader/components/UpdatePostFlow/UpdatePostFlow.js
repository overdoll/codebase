/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import { useToast, Flex, Stack, Box, Spacer } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import Audience from './Audience/Audience'
import Brand from './Brand/Brand'
import Category from './Category/Category'
import Character from './Character/Character'
import Arrange from './Arrange/Arrange'
import Review from './Review/Review'
import Submit from './Submit/Submit'
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

// TODO all the mutations go here
// TODO dispatch only responsible for stepping and uploads
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

  const [t] = useTranslation('upload')

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const commit = () => {
    return null
  }

  const notify = useToast()

  // Tagging step - disabled if the conditions aren't met
  const NextDisabled =
    state.step === STEPS.TAG &&
    (Object.keys(state.characters).length < 1 ||
      Object.keys(state.artist).length < 1 ||
      Object.keys(state.categories).length < 3)

  // If the amount of files != the amount of urls (not all files were uploaded), then we can't submit yet
  const SubmitDisabled = state.files.length !== Object.keys(state.urls).length

  const CurrentStep = (): Node => {
    switch (state.step) {
      case STEPS.ARRANGE:

        return <Arrange uppy={uppy} dispatch={dispatch} state={state} />

      case STEPS.AUDIENCE:

        return <Audience />

      case STEPS.BRAND:

        return <Brand />

      case STEPS.CATEGORY:

        return <Category />

      case STEPS.CHARACTER:

        return <Character />

      case STEPS.REVIEW:

        return <Review />

      case STEPS.SUBMIT:

        return <Submit />

      default:
        return <Arrange uppy={uppy} dispatch={dispatch} state={state} />
    }
  }

  const goForward = (): void => {
    switch (state.step) {
      case STEPS.ARRANGE:
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
        break
      case STEPS.AUDIENCE:
        dispatch({ type: EVENTS.STEP, value: STEPS.BRAND })
        break
      case STEPS.BRAND:
        dispatch({ type: EVENTS.STEP, value: STEPS.CATEGORY })
        break
      case STEPS.CATEGORY:
        dispatch({ type: EVENTS.STEP, value: STEPS.CHARACTER })
        break
      case STEPS.CHARACTER:
        dispatch({ type: EVENTS.STEP, value: STEPS.REVIEW })
        break
      default:
        break
    }
  }

  const ForwardButton = () => {
    switch (state.step) {
      case STEPS.REVIEW:
        return <Button colorScheme='primary' size='lg' onClick={onSubmitPost}>submit</Button>
      case STEPS.SUBMIT:
        return <></>
      default:
        return <Button colorScheme='gray' size='lg' onClick={goForward}>forward</Button>
    }
  }

  const goBack = (): void => {
    switch (state.step) {
      case STEPS.AUDIENCE:
        dispatch({ type: EVENTS.STEP, value: STEPS.ARRANGE })
        break
      case STEPS.BRAND:
        dispatch({ type: EVENTS.STEP, value: STEPS.AUDIENCE })
        break
      case STEPS.CATEGORY:
        dispatch({ type: EVENTS.STEP, value: STEPS.BRAND })
        break
      case STEPS.CHARACTER:
        dispatch({ type: EVENTS.STEP, value: STEPS.CATEGORY })
        break
      case STEPS.REVIEW:
        dispatch({ type: EVENTS.STEP, value: STEPS.CHARACTER })
        break
      default:
        break
    }
  }

  const BackButton = () => {
    switch (state.step) {
      case STEPS.SUBMIT:
        return <></>
      case STEPS.ARRANGE:
        return <></>
      default:
        return <Button colorScheme='gray' size='lg' onClick={goBack}>back</Button>
    }
  }

  // When user submits the post
  const onSubmitPost = () => {
    dispatch({ type: EVENTS.STEP, value: STEPS.SUBMIT })
    onCleanup()
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
  const onCleanup = () => {
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
    // URL param cleared here to set it to original state
    // or just clear the store?
  }

  return (
    <Stack spacing={4}>
      <Box>
        <ProgressIndicator state={state} />
      </Box>
      <Box>
        {CurrentStep()}
      </Box>
      <Flex>
        <BackButton />
        <Spacer />
        <ForwardButton />
      </Flex>
    </Stack>
  )
}
