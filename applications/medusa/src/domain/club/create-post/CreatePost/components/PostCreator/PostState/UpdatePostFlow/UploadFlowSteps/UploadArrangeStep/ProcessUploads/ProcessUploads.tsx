import { useContext, useEffect, useState } from 'react'
import { Flex, Stack } from '@chakra-ui/react'
import File from './File/File'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ProcessUploadsFragment$key } from '@//:artifacts/ProcessUploadsFragment.graphql'
import type { ProcessUploadsMutation } from '@//:artifacts/ProcessUploadsMutation.graphql'
import { useFragment } from 'react-relay'
import Button from '@//:modules/form/Button/Button'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import FilePicker from '../../../../../../FilePicker/FilePicker'
import { FileUpload } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import { UppyContext } from '../../../../../../../context'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: ProcessUploadsFragment$key
}

const ProcessUploadsFragmentGQL = graphql`
  fragment ProcessUploadsFragment on Post {
    id
    reference
    content {
      id
    }
  }
`

const ProcessUploadsMutationGQL = graphql`
  mutation ProcessUploadsMutation($input: AddPostContentInput!) {
    addPostContent(input: $input) {
      post {
        id
        reference
        content {
          id
          resource {
            type
            processed
            urls {
              url
              mimeType
            }
          }
        }
      }
    }
  }
`

export default function ProcessUploads ({
  query
}: Props): JSX.Element {
  const uppy = useContext(UppyContext)
  const {
    state,
    dispatch
  } = useSequenceContext()
  const data = useFragment(ProcessUploadsFragmentGQL, query)

  const [updateContent, isUpdatingContent] = useMutation<ProcessUploadsMutation>(ProcessUploadsMutationGQL)

  const [hasProcessingError, setProcessingError] = useState(false)

  // Function for updating content with uploads + current content
  const onUpdateContent = (): void => {
    if (Object.keys(state.urls).length > 0) {
      setProcessingError(false)
      const uploadedURLs = Object.values(state.urls)

      updateContent({
        variables: {
          input: {
            id: data.id,
            content: uploadedURLs as string[]
          }
        },
        onCompleted () {
          dispatch({
            type: 'urls',
            value: {},
            transform: 'SET'
          })
          dispatch({
            type: 'progress',
            value: {},
            transform: 'SET'
          })
          dispatch({
            type: 'files',
            value: [],
            transform: 'SET'
          })
        },
        onError () {
          setProcessingError(true)
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
          >
            <Trans>
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
              file={file}
            />
          )
        })}
        {hasProcessingError && <ErrorMessage />}
      </Stack>
    </>
  )
}