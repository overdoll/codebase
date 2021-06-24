/**
 * @flow
 */
import type { Node } from 'react'
import { useRef } from 'react'
import Arrange from './arrange/Arrange'
import Begin from './begin/Begin'
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants'
import Tag from './tag/Tag'
import Review from './review/Review'
import Finish from './finish/Finish'
import { graphql, useMutation } from 'react-relay/hooks'
import type {
  CharacterRequest,
  StepsMutation
} from '@//:artifacts/StepsMutation.graphql'
import type { Dispatch, State } from '@//:types/upload'
import {
  useToast, Flex, Spacer, Center, Spinner, Heading, Text, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react'
import Button from '@//:modules/form/button'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

const SubmitGraphQL = graphql`
  mutation StepsMutation($data: PostInput) {
    post(data: $data) {
      review
      validation {
        code
      }
    }
  }
`

// Stepper - handles all stepping functions
export default function Steps ({ uppy, state, dispatch }: Props): Node {
  const [commit, isInFlight] = useMutation<StepsMutation>(SubmitGraphQL)

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
        return (
          <Arrange
            uppy={uppy}
            dispatch={dispatch}
            state={state}
          />
        )
      case STEPS.TAG:
        return (
          <Tag disabled={NextDisabled} dispatch={dispatch} state={state} />
        )
      case STEPS.REVIEW:
        return <Review disabled={SubmitDisabled} state={state} />
      case STEPS.FINISH:
        return <Finish state={state} />
      default:
        return (
          <Begin uppy={uppy} />
        )
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
        characterRequests.push({
          name: character.name,
          media: character.media.request
            ? character.media.title
            : character.media.id
        })
      }

      // if the media is requested, add it to our list
      if (character.media.request) {
        mediaRequests.push(character.media.title)
      }

      return !(character.media.request || character.request)
    })

    // Commit all results
    commit({
      variables: {
        data: {
          artistUsername: state.artist.username ?? '',
          artistId: state.artist.id,
          categories: Object.keys(state.categories),
          characters: characters,
          content: urls,
          characterRequests: characterRequests,
          mediaRequests: mediaRequests
        }
      },
      onCompleted (data) {
        if (data.post?.validation !== null) {
          notify({
            status: 'error',
            title: data?.post?.validation?.code,
            isClosable: true
          })
        } else {
          dispatch({ type: EVENTS.SUBMIT, value: data.post })
        }
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
    <Center mt={8}>
      <Flex
        w={['full', 'sm', 'md', 'lg']}
        pl={[1, 0]}
        pr={[1, 0]}
        direction='column'
        mb={6}
      >
        <>
          {Step()}
          <Flex>
            {state.step !== null && state.step !== STEPS.FINISH && (
              <Flex w='100%' justify='space-between' mt={2}>
                {state.step !== STEPS.ARRANGE
                  ? (
                    <Button
                      size='lg'
                      disabled={isInFlight}
                      onClick={PrevStep}
                      variant='ghost'
                    >
                      {t('button.back')}
                    </Button>
                    )
                  : (
                    <>
                      <Button size='lg' variant='ghost' onClick={onOpen}>
                        {t('button.cancel')}
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg'>
                              {u('steps.cancel_modal.header')}
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              {u('steps.cancel_modal.subheader')}
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button size='lg' onClick={onClose}>
                                {u('steps.cancel_modal.back')}
                              </Button>
                              <Button size='lg' variant='outline' colorScheme='orange' onClick={onCancel} ml={3}>
                                {u('steps.cancel_modal.confirm')}
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </>
                    )}
                <Spacer />
                {state.step !== STEPS.REVIEW
                  ? (
                    <Button
                      size='lg'
                      disabled={NextDisabled}
                      onClick={NextStep}
                    >
                      {t('button.next')}
                    </Button>
                    )
                  : (
                    <Button
                      size='lg'
                      onClick={onSubmit}
                      colorScheme='red'
                      variant='outline'
                      disabled={SubmitDisabled || isInFlight}
                    >
                      {t('button.submit')}
                    </Button>
                    )}
              </Flex>
            )}
          </Flex>
        </>
      </Flex>
    </Center>
  )
}
