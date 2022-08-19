import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { UploadContentAddFragment$key } from '@//:artifacts/UploadContentAddFragment.graphql'
import { Stack, useUpdateEffect } from '@chakra-ui/react'
import ContentFilesDisplay from './ContentFilesDisplay/ContentFilesDisplay'
import { UploadContentAddMutation } from '@//:artifacts/UploadContentAddMutation.graphql'
import { useEffect, useState } from 'react'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import ContentUpdateDisplay from './ContentUpdateDisplay/ContentUpdateDisplay'

interface Props {
  query: UploadContentAddFragment$key
}

const Fragment = graphql`
  fragment UploadContentAddFragment on Post {
    id
    content {
      id
      resource {
        id
      }
    }
  }
`

const Mutation = graphql`
  mutation UploadContentAddMutation($input: AddPostContentInput!) {
    addPostContent(input: $input) {
      post {
        id
        reference
        content {
          id
          resource {
            urls {
              url
              mimeType
            }
            progress {
              progress
              state
            }
            videoThumbnail {
              url
            }
            type
            processed
            preview
            failed
            width
            height
            videoNoAudio
            videoDuration
            ...ResourceItemFragment
          }
        }
      }
    }
  }
`

export default function UploadContentAdd ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const uppy = useUppyContext()
  const {
    state,
    dispatch
  } = useSequenceContext()

  const [updateContent, isUpdatingContent] = useMutation<UploadContentAddMutation>(Mutation)

  const [hasUpdateError, setHasUpdateError] = useState(false)

  // Function for updating content with uploads + current content
  const onUpdateContent = (): void => {
    if (Object.keys(state.urls).length > 0) {
      setHasUpdateError(false)
      const fileOrder = Object.keys(state.files)
      const arrangedUrls = fileOrder.map((item) => state.urls[item])

      updateContent({
        variables: {
          input: {
            id: data.id,
            content: arrangedUrls as string[]
          }
        },
        // check state for duplicate URL's. if they are the same, notify that duplicates were ignored
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
          setHasUpdateError(true)
        }
      })
    }
  }

  // When all the uploads are complete, we commit the post content
  useEffect(() => {
    if (Object.keys(state.urls).length < 1 && Object.keys(state.files).length < 1 && Object.keys(state.errors).length < 1) {
      setHasUpdateError(false)
    }
    if ((Object.keys(state.urls)).length === Object.values(state.files).length && Object.values(state.files).length > 0 && (Object.keys(state.urls)).length > 0 && (Object.keys(state.errors)).length < 1) {
      onUpdateContent()
    }
  }, [state.urls, state.files, state.errors])

  // When post content has been updated, we reset uppy and re-add all the files to keep uppy's internal limiter on file count upload limit
  useUpdateEffect(() => {
    if (Object.values(state.files).length < 1 && Object.keys(state.urls).length < 1) {
      setHasUpdateError(false)
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

  return (
    <Stack spacing={1}>
      <ContentUpdateDisplay
        hasUpdateError={hasUpdateError}
        isUpdating={isUpdatingContent}
        onRetryUpdate={onUpdateContent}
      />
      <ContentFilesDisplay isDisabled={isUpdatingContent} />
    </Stack>
  )
}
