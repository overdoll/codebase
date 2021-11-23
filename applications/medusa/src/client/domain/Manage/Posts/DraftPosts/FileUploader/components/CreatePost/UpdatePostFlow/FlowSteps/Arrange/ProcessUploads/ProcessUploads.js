/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import {
  Alert, AlertDescription, AlertIcon, Flex,
  Stack
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import File from './File/File'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ProcessUploadsFragment$key } from '@//:artifacts/ProcessUploadsFragment.graphql'
import type ProcessUploadsMutation from '@//:artifacts/ProcessUploadsMutation.graphql'
import { useFragment } from 'react-relay'
import { useEffect, useState } from 'react'
import { EVENTS } from '../../../../../../constants/constants'
import Button from '@//:modules/form/Button'
import Icon from '@//:modules/content/Icon/Icon'
import FilePicker from '../../../../../FilePicker/FilePicker'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ProcessUploadsFragment$key
};

const ProcessUploadsFragmentGQL = graphql`
  fragment ProcessUploadsFragment on Post {
    id
    content {
      urls {
        url
      }
    }
  }
`

const ProcessUploadsMutationGQL = graphql`
  mutation ProcessUploadsMutation($input: UpdatePostContentInput!) {
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

export default function ProcessUploads ({ state, dispatch, uppy, query }: Props): Node {
  const data = useFragment(ProcessUploadsFragmentGQL, query)

  const [updateContent, isUpdatingContent] = useMutation<ProcessUploadsMutation>(ProcessUploadsMutationGQL)

  const [t] = useTranslation('manage')

  const [hasProcessingError, setProcessingError] = useState(false)

  const postContent = data?.content

  // Function for updating content with uploads + current content
  const onUpdateContent = () => {
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
            dispatch({
              type: EVENTS.FILES,
              value: { id: item },
              remove: true
            })
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
              type: EVENTS.CONTENT, clear: true
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

  if (state.files.length < 1) {
    return <></>
  }

  return (
    <>
      <Stack spacing={2}>
        {state.files.map((file, index) => {
          return (
            <File
              disabled={false} key={index} uppy={uppy}
              state={state} file={file}
              dispatch={dispatch}
            />
          )
        })}
        {hasProcessingError && <ErrorMessage />}
      </Stack>
    </>
  )
}
