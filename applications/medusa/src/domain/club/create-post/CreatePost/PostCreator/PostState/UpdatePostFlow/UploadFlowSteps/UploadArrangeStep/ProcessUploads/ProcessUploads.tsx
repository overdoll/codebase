import { useEffect, useState } from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ProcessUploadsFragment$key } from '@//:artifacts/ProcessUploadsFragment.graphql'
import type { ProcessUploadsMutation } from '@//:artifacts/ProcessUploadsMutation.graphql'
import { useFragment } from 'react-relay'
import Button from '@//:modules/form/Button/Button'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import GenericFilePicker
  from '@//:modules/content/HookedComponents/Upload/components/GenericFilePicker/GenericFilePicker'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import UploadFileDisplay
  from '@//:modules/content/HookedComponents/Upload/components/UploadFileDisplay/UploadFileDisplay'
import { UppyFile } from '@uppy/core'

interface Props {
  query: ProcessUploadsFragment$key
}

const ProcessUploadsFragmentGQL = graphql`
  fragment ProcessUploadsFragment on Post {
    id
    content {
      id
      resource {
        id
      }
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
            preview
            failed
            width
            height
          }
        }
      }
    }
  }
`

export default function ProcessUploads ({
  query
}: Props): JSX.Element {
  const uppy = useUppyContext()
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
            type: 'files',
            value: {},
            transform: 'SET'
          })
          dispatch({
            type: 'errors',
            value: {},
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
    if ((Object.keys(state.urls)).length === Object.values(state.files).length && Object.values(state.files).length > 0 && (Object.keys(state.urls)).length > 0 && (Object.keys(state.errors)).length < 1) {
      onUpdateContent()
    }
  }, [state.urls, state.files, state.errors])

  // When post content has been updated, we reset uppy and re-add all the files to keep uppy's internal limiter on file count upload limit
  useEffect(() => {
    if (Object.values(state.files).length < 1 && Object.keys(state.urls).length < 1) {
      uppy.cancelAll()
      data.content.forEach((file, index) => {
        const uppyFileId = uppy.addFile({
          id: `${file.resource.id}_${index}`,
          name: `${file.resource.id}_${index}`,
          type: 'image/png',
          data: new Blob(),
          source: 'already-uploaded'
        })

        const fileFromUppy = uppy.getFile(uppyFileId)
        uppy.emit('upload-started', fileFromUppy)
        uppy.emit('upload-progress', fileFromUppy, {
          bytesUploaded: 1,
          bytesTotal: 1
        })
        uppy.emit('upload-success', fileFromUppy, 'success')
      })
    }
  }, [data.content])

  // If processing error, show a message
  const ErrorMessage = (): JSX.Element => {
    return (
      <Alert status='warning'>
        <Flex w='100%' align='center' justify='space-between'>
          <Flex>
            <AlertIcon />
            <AlertDescription>
              <Trans>
                Error adding uploaded files to post
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

  if (Object.values(state.files).length < 1) {
    if (state.isRearranging === true) {
      return (
        <ClickableTile isDisabled>
          <LargeBackgroundBox>
            <Stack py={2} align='center' justify='center'>
              <Icon
                w={6}
                h={6}
                icon={WarningTriangle}
                fill='orange.300'
              />
              <Heading textAlign='center' fontSize='lg' color='orange.300'>
                <Trans>
                  Upload Restricted While Rearranging
                </Trans>
              </Heading>
            </Stack>
          </LargeBackgroundBox>
        </ClickableTile>
      )
    }

    return (
      <GenericFilePicker uppy={uppy} />
    )
  }

  return (
    <Stack spacing={2}>
      {Object.values(state.files).map((file: UppyFile, index) => {
        return (
          <UploadFileDisplay
            error={state.errors[file.id]}
            key={index}
            file={file}
            uppy={uppy}
            isDisabled={isUpdatingContent}
          />
        )
      })}
      {hasProcessingError && <ErrorMessage />}
    </Stack>
  )
}
