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
import FlowHeader from './FlowHeader/FlowHeader'
import FlowSteps from './FlowSteps/FlowSteps'
import FlowForwardButton from './FlowFooter/FlowForwardButton/FlowForwardButton'
import FlowBackwardButton from './FlowFooter/FlowBackwardButton/FlowBackwardButton'
import type CreatePostQuery from '@//:artifacts/CreatePostQuery.graphql'
import type UpdatePostFlowContentMutation from '@//:artifacts/UpdatePostFlowContentMutation.graphql'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import FlowFooter from './FlowFooter/FlowFooter'

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

  // figure out how to make this function "importable"
  const onUpdateContent = () => {
    // add current files on top of here as well

    if (Object.keys(state.urls).length > 0) {
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
              type: EVENTS.THUMBNAILS,
              value: { [item]: state.thumbnails[item] },
              remove: true
            })
            dispatch({
              type: EVENTS.URLS,
              value: { [item]: state.urls[item] },
              remove: true
            })
          })
        },
        onError (data) {
          // what happens if there is an error? give retry button as notification
          console.log(data)
        }
      })
    }
  }

  useEffect(() => {
    // buffer these so it runs after 3 seconds
    if ((Object.keys(state.urls)).length === state.files.length) {
      onUpdateContent()
    }
  }, [state.urls])

  const disableNavigation = isUpdatingContent

  const [t] = useTranslation('manage')

  return (
    <Stack spacing={4}>
      <Box>
        <FlowHeader uppy={uppy} dispatch={dispatch} state={state} />
      </Box>
      <Box>
        <FlowSteps uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Box>
      <Flex justify='center'>
        <FlowFooter uppy={uppy} dispatch={dispatch} state={state} disableNavigation={disableNavigation} />
      </Flex>
    </Stack>
  )
}
