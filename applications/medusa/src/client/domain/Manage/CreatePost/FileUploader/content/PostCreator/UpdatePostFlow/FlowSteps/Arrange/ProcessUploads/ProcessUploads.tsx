import { useEffect, useState } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { Alert, AlertDescription, AlertIcon, Flex, Stack } from '@chakra-ui/react'
import File from './File/File'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ProcessUploadsFragment$key } from '@//:artifacts/ProcessUploadsFragment.graphql'
import type { ProcessUploadsMutation } from '@//:artifacts/ProcessUploadsMutation.graphql'
import { useFragment } from 'react-relay'
import { EVENTS } from '../../../../../../constants/constants'
import Button from '@//:modules/form/Button/Button'
import Icon from '@//:modules/content/Icon/Icon'
import FilePicker from '../../../../../../components/FilePicker/FilePicker'
import { FileUpload } from '../../../../../../../../../../../assets/icons/interface'
import { Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: ProcessUploadsFragment$key
}

const ProcessUploadsFragmentGQL = graphql`
  fragment ProcessUploadsFragment on Post {
    id
    reference
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
        reference
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

export default function ProcessUploads ({
  state,
  dispatch,
  uppy,
  query
}: Props): JSX.Element {
  const data = useFragment(ProcessUploadsFragmentGQL, query)

  const [updateContent, isUpdatingContent] = useMutation<ProcessUploadsMutation>(ProcessUploadsMutationGQL)

  const [hasProcessingError, setProcessingError] = useState(false)

  // Function for updating content with uploads + current content
  const onUpdateContent = (): void => {
    if (Object.keys(state.urls).length > 0) {
      setProcessingError(false)
      const uploadedIDs = Object.keys(state.urls)
      const uploadedURLs = Object.values(state.urls)
      const currentURLs = data?.content.map((item) =>
        item.urls[0].url)

      const combinedUpload = [...currentURLs, ...uploadedURLs] as string[]

      updateContent({
        variables: {
          input: {
            id: data.id,
            content: combinedUpload
          }
        },
        onCompleted () {
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
              type: EVENTS.CONTENT,
              clear: true,
              value: true
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
    if ((Object.keys(state.urls)).length === state.files.length && state.files.length > 0 && (Object.keys(state.urls)).length > 0) {
      onUpdateContent()
    }
  }, [state.urls, state.files])

  // If processing error, show a message
  const ErrorMessage = (): JSX.Element => {
    return (
      <Alert status='warning'>
        <Flex w='100%' align='center' justify='space-between'>
          <Flex>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                There was an error processing your files
              </Trans>
            </AlertDescription>
          </Flex>
          <Button size='sm' onClick={onUpdateContent} colorScheme='orange' variant='solid'>
            <Trans>
              Retry
            </Trans>
          </Button>
        </Flex>
      </Alert>
    )
  }

  if (state.files.length < 1) {
    return (
      <FilePicker w='auto' uppy={uppy}>
        <Flex w='100%' align='center' justify='flex-end'>
          <Button
            w='100%'
            variant='solid'
            size='md'
            rightIcon={<Icon h={3} w={3} icon={FileUpload} fill='gray.100' />}
          ><Trans>
            Upload Files
          </Trans>
          </Button>
        </Flex>
      </FilePicker>
    )
  }

  return (
    <>
      <Stack spacing={2}>
        {state.files.map((file, index) => {
          return (
            <File
              disabled={isUpdatingContent}
              key={index}
              uppy={uppy}
              state={state}
              file={file}
              dispatch={dispatch}
            />
          )
        })}
        {hasProcessingError && <ErrorMessage />}
      </Stack>
    </>
  )
}
