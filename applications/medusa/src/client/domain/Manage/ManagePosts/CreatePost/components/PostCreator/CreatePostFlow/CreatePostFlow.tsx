import { useContext, useEffect } from 'react'
import { Box, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import DragOverFileInput from '../../DragOverFileInput/DragOverFileInput'
import FilePicker from '../../FilePicker/FilePicker'
import { FileUpload, WarningTriangle } from '@//:assets/icons/interface'
import Icon from '@//:modules/content/Icon/Icon'
import { CreatePostFlowMutationResponse } from '@//:artifacts/CreatePostFlowMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { StateContext, UppyContext } from '../../../context'

const Mutation = graphql`
  mutation CreatePostFlowMutation($clubId: ID!) {
    createPost(input: {clubId: $clubId}) {
      post {
        reference
      }
    }
  }
`

export default function CreatePostFlow (): JSX.Element {
  const [, setPostReference] = useQueryParam<string | null | undefined>('id')

  const uppy = useContext(UppyContext)
  const state = useContext(StateContext)

  const [createPost, isCreatingPost] = useMutation(Mutation)

  const notify = useToast()

  const onCreatePost = (id): void => {
    createPost({
      variables: {
        clubId: id
      },
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

  // add a state to uppy to keep track of the club that's selected
  useEffect(() => {
    uppy.setMeta({ club: state.club })
  }, [state.club])

  useEffect(() => {
    // @ts-expect-error
    // it's in their documentation but doesn't exist as a type...
    uppy.once('file-added', file => {
      const club = uppy.getState().meta.club
      if (club != null) {
        onCreatePost(club)
      }
    })
  }, [uppy])

  if (state.club == null) {
    return (
      <PostPlaceholder>
        <Icon
          w={12}
          h={12}
          icon={WarningTriangle}
          fill='orange.300'
        />
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            <Trans>
              Select A Club
            </Trans>
          </Heading>
          <Text color='gray.200'>
            <Trans>
              Before you can upload, you need to select a club from the list above.
            </Trans>
          </Text>
        </Box>
      </PostPlaceholder>
    )
  }

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
                Upload one or more files by dragging and dropping them or by clicking here
              </Trans>
            </Text>
          </Box>
        </PostPlaceholder>
      </DragOverFileInput>
    </FilePicker>
  )
}