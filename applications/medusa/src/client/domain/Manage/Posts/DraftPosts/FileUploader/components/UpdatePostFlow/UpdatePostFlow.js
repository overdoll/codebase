/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import { useToast, Flex, Stack, Box, Spacer } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'
import FlowProgressIndicator from './FlowProgressIndicator/FlowProgressIndicator'
import FlowSteps from './FlowSteps/FlowSteps'
import FlowForwardButton from './FlowForwardButton/FlowForwardButton'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

// TODO mutation for submitting post goes here
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

  const [t] = useTranslation('manage')

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const notify = useToast()

  // Determine what happens when you click the "back" button
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

  // Component to calculate the "back" button in the flow
  const BackButton = () => {
    switch (state.step) {
      case STEPS.SUBMIT:
        return <></>
      case STEPS.ARRANGE:
        return <></>
      default:
        return <Button colorScheme='gray' size='lg' onClick={goBack}>{t('posts.flow.steps.footer.back')}</Button>
    }
  }

  // A steps footer component
  const FlowFooter = () => {
    if (state.step !== STEPS.SUBMIT) {
      return (
        <>
          <BackButton />
          <Spacer />
          <FlowForwardButton uppy={uppy} dispatch={dispatch} state={state} onSubmit={onSubmitPost} />
        </>
      )
    }
    return (
      <Button
        colorScheme='gray' size='lg' onClick={() => dispatch({
          type: EVENTS.CLEANUP,
          value: INITIAL_STATE
        })}
      >{t('posts.flow.steps.footer.retry')}
      </Button>
    )
  }

  // A header for the post
  const FlowHeader = () => {
    if (state.step !== STEPS.SUBMIT) {
      return <FlowProgressIndicator state={state} onCancel={onCleanup} />
    }
    return <></>
  }

  // When user submits the post or cancels the flow
  const onSubmitPost = () => {
    // query for submitting post. on success, runs the functions below
    onCleanup()
    dispatch({ type: EVENTS.STEP, value: STEPS.SUBMIT })
  }

  // Cleanup - reset uppy uploads and state
  const onCleanup = () => {
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
  }

  return (
    <Stack spacing={4}>
      <Box>
        <FlowHeader />
      </Box>
      <Box>
        <FlowSteps uppy={uppy} dispatch={dispatch} state={state} />
      </Box>
      <Flex justify='center'>
        <FlowFooter />
      </Flex>
    </Stack>
  )
}
