import { useContext, useEffect } from 'react'
import { Box, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import DragOverFileInput from '../../DragOverFileInput/DragOverFileInput'
import FilePicker from '../../FilePicker/FilePicker'
import { FileUpload } from '@//:assets/icons/interface'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { CreatePostFlowMutationResponse } from '@//:artifacts/CreatePostFlowMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { UppyContext } from '../../../context'

interface Props {
  clubId: string | undefined
}

const Mutation = graphql`
  mutation CreatePostFlowMutation($clubId: ID!) {
    createPost(input: {clubId: $clubId}) {
      post {
        reference
      }
    }
  }
`

export default function CreatePostFlow ({ clubId }: Props): JSX.Element {
  const [postReference, setPostReference] = useQueryParam<string | null | undefined>('post')

  const uppy = useContext(UppyContext)

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

  // TODO write this better. seems super hacky.

  // TODO there are still bugs where it will automatically generate a post
  // TODO even though no file was added

  // add a state to uppy to keep track of the club that's selected
  useEffect(() => {
    uppy.setMeta({
      club: clubId
    })
  }, [clubId])

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
