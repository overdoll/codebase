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
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'
import FlowProgressIndicator from './FlowProgressIndicator/FlowProgressIndicator'
import FlowSteps from './FlowSteps/FlowSteps'
import FlowForwardButton from './FlowForwardButton/FlowForwardButton'
import FlowBackwardButton from './FlowBackwardButton/FlowBackwardButton'
import type CreatePostQuery from '@//:artifacts/CreatePostQuery.graphql'
import type UpdatePostFlowContentMutation from '@//:artifacts/UpdatePostFlowContentMutation.graphql'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: UpdatePostFlowFragment$key
};

const UpdatePostFlowFragmentGQL = graphql`
  fragment UpdatePostFlowFragment on Post {
    id
    ...ArrangeFragment
  }
`

const UpdatePostFlowContentMutationGQL = graphql`
  mutation UpdatePostFlowContentMutation($input: UpdatePostContentInput!) {
    updatePostContent(input: $input) {
      post {
        id
        content {
          id
          type
          urls {
            url
            mimeType
          }
        }
      }
    }
  }
`

// Stepper - handles all stepping functions
export default function UpdatePostFlow ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(UpdatePostFlowFragmentGQL, query)

  const [updateContent, isUpdatingContent] = useMutation<UpdatePostFlowContentMutation>(UpdatePostFlowContentMutationGQL)

  const onUpdateContent = () => {
    // add current files on top of here as well

    if (Object.keys(state.urls).length > 0) {
      const fileIDs = Object.keys(state.urls)
      const fileURLs = Object.values(state.urls)

      updateContent({
        variables: {
          input: {
            id: data.id,
            content: fileURLs
          }
        },
        onCompleted (data) {
          // when successful, clear uppy uploaded files by key
          console.log(data)
        },
        onError (data) {
          console.log(data)
        }
      })
    }
  }

  useEffect(() => {
    dispatch({ type: EVENTS.PENDING, value: isUpdatingContent })
  }, [isUpdatingContent])

  useEffect(() => {
    onUpdateContent()
  }, [state.urls])

  const [t] = useTranslation('manage')

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  // A steps footer component
  const FlowFooter = () => {
    if (state.step !== STEPS.SUBMIT) {
      return (
        <>
          <FlowBackwardButton uppy={uppy} dispatch={dispatch} state={state} />
          <Spacer />
          <FlowForwardButton uppy={uppy} dispatch={dispatch} state={state} />
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
        <FlowSteps uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Box>
      <Flex justify='center'>
        <FlowFooter />
      </Flex>
    </Stack>
  )
}
