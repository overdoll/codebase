import { useEffect } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import { Box, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import DragOverFileInput from '../../../components/DragOverFileInput/DragOverFileInput'
import FilePicker from '../../../components/FilePicker/FilePicker'
import { FileUpload } from '../../../../../../../../assets/icons/interface'
import Icon from '@//:modules/content/Icon/Icon'
import { CreatePostFlowMutationResponse } from '@//:artifacts/CreatePostFlowMutation.graphql'
import { t, Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
}

const Mutation = graphql`
  mutation CreatePostFlowMutation {
    createPost {
      post {
        reference
      }
    }
  }
`

export default function CreatePostFlow ({
  uppy,
  state,
  dispatch
}: Props): JSX.Element {
  const [, setPostReference] = useQueryParam<string | null | undefined>('id')

  const [createPost, isCreatingPost] = useMutation(Mutation)

  const notify = useToast()

  const onCreatePost = (): void => {
    createPost({
      variables: {},
      onCompleted (data: CreatePostFlowMutationResponse) {
        setPostReference(data?.createPost?.post?.reference as string)
      },

      onError () {
        notify({
          status: 'error',
          title: t`There was an error creating a draft post`,
          isClosable: true
        })
      }
    })
  }

  useEffect(() => {
    // @ts-expect-error
    // it's in their documentation but doesn't exist as a type...
    uppy.once('file-added', file => {
      onCreatePost()
    })
  }, [uppy])

  if (isCreatingPost) {
    return (
      <PostPlaceholder>
        <Spinner mb={6} thickness='4px' size='lg' color='primary.500' />
        <Text color='gray.100'><Trans>Creating your post...</Trans></Text>
      </PostPlaceholder>
    )
  }

  return (
    <FilePicker uppy={uppy}>
      <DragOverFileInput uppy={uppy}>
        <PostPlaceholder>
          <Icon
            w={12}
            h={12}
            icon={FileUpload}
            fill='teal.300'
          />
          <Box>
            <Heading color='gray.00' fontSize='4xl'>
              <Trans>
                Upload Files
              </Trans>
            </Heading>
            <Text color='gray.200'>
              <Trans>
                Upload one or more files by dragging and dropping them
              </Trans>
            </Text>
          </Box>
        </PostPlaceholder>
      </DragOverFileInput>
    </FilePicker>
  )
}
