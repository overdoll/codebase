/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import { useToast, Flex, Stack, Box, Spacer, AlertIcon, AlertDescription, Alert } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import Button from '@//:modules/form/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StringParam, useQueryParam } from 'use-query-params'
import FlowHeader from './FlowHeader/FlowHeader'
import FlowSteps from './FlowSteps/FlowSteps'
import FlowForwardButton from './FlowFooter/FlowForwardButton/FlowForwardButton'
import FlowBackwardButton from './FlowFooter/FlowBackwardButton/FlowBackwardButton'
import type CreatePostQuery from '@//:artifacts/CreatePostQuery.graphql'
import type UpdatePostFlowContentMutation from '@//:artifacts/UpdatePostFlowContentMutation.graphql'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import FlowFooter from './FlowFooter/FlowFooter'
import Link from '@//:modules/routing/Link'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: UpdatePostFlowFragment$key
};

const UpdatePostFlowFragmentGQL = graphql`
  fragment UpdatePostFlowFragment on Post {
    id
    content {
      urls {
        url
      }
    }
    ...ArrangeFragment
    ...FlowFooterFragment
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

  const postContent = data.content

  const [updateContent, isUpdatingContent] = useMutation<UpdatePostFlowContentMutation>(UpdatePostFlowContentMutationGQL)

  const [hasProcessingError, setProcessingError] = useState(false)

  const disableNavigation = isUpdatingContent

  const onUpdateContent = () => {
    // add current files on top of here as well

    if (Object.keys(state.urls).length > 0) {
      setProcessingError(false)
      const uploadedIDs = Object.keys(state.urls)
      const uploadedURLs = Object.values(state.urls)
      const currentURLs = postContent?.map((item) =>
        item.urls[0].url) || []
      const combinedUpload = [...currentURLs, ...uploadedURLs]

      updateContent({
        variables: {
          input: {
            id: data.id,
            content: combinedUpload
          }
        },
        onCompleted (data) {
          uploadedIDs.forEach((item) => {
            uppy.removeFile(item)
            dispatch({ type: EVENTS.FILES, value: { id: item }, remove: true })
            dispatch({
              type: EVENTS.PROGRESS,
              value: { [item]: state.progress[item] },
              remove: true
            })
            dispatch({
              type: EVENTS.URLS,
              value: { [item]: state.urls[item] },
              remove: true
            })
            dispatch({
              type: EVENTS.CLEAR_CONTENT
            })
          })
        },
        onError (data) {
          setProcessingError(true)
          console.log(data)
        }
      })
    }
  }

  // When all the uploads are complete, we commit the post content
  useEffect(() => {
    if ((Object.keys(state.urls)).length === state.files.length) {
      onUpdateContent()
    }
  }, [state.urls])

  // Need to create a limit to uploading files
  // Emit all current files to uppy?

  const ErrorMessage = () => {
    return (
      <Alert status='warning'>
        <Flex w='100%' align='center' justify='space-between'>
          <Flex>
            <AlertIcon />
            <AlertDescription>
              {t('posts.flow.steps.arrange.uploader.processing.error.message')}
            </AlertDescription>
          </Flex>
          <Button size='sm' onClick={onUpdateContent} colorScheme='orange' variant='solid'>
            {t('posts.flow.steps.arrange.uploader.processing.error.button')}
          </Button>
        </Flex>
      </Alert>
    )
  }

  const [t] = useTranslation('manage')

  return (
    <Stack spacing={4}>
      <Box>
        <FlowHeader uppy={uppy} dispatch={dispatch} state={state} />
      </Box>
      {hasProcessingError && <ErrorMessage />}
      <Box>
        <FlowSteps uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Box>
      <Flex justify='center'>
        <FlowFooter uppy={uppy} dispatch={dispatch} state={state} query={data} disableNavigation={disableNavigation} />
      </Flex>
    </Stack>
  )
}
