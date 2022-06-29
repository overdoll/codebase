import { useContext, useEffect } from 'react'
import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { graphql, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { CreatePostFlowMutation$data } from '@//:artifacts/CreatePostFlowMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { UppyContext } from '../../../../context'
import { useToast } from '@//:modules/content/ThemeComponents'
import CreatePostFilePicker
  from '@//:modules/content/Interactables/FileUpload/CreatePostFilePicker/CreatePostFilePicker'

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
  const [, setPostReference] = useQueryParam<string | null | undefined>('post')

  const uppy = useContext(UppyContext)

  const [createPost, isCreatingPost] = useMutation(Mutation)

  const notify = useToast()

  const onCreatePost = (id): void => {
    createPost({
      variables: {
        clubId: id
      },
      onCompleted (data: CreatePostFlowMutation$data) {
        setPostReference(data?.createPost?.post?.reference as string)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error creating a draft post`
        })
      }
    })
  }
  // add a state to uppy to keep track of the club that's selected
  useEffect(() => {
    uppy.setMeta({
      club: clubId
    })
  }, [clubId])

  useEffect(() => {
    const callBackFn = (file): void => {
      if (file.source !== 'already-uploaded') {
        const club = uppy.getState().meta.club
        if (club != null) {
          onCreatePost(club)
        }
      }
    }

    // @ts-expect-error
    uppy.once('file-added', callBackFn)
    return () => {
      uppy.off('file-added', callBackFn)
    }
  }, [uppy])

  if (isCreatingPost) {
    return (
      <PostPlaceholder>
        <Stack align='center' spacing={6}>
          <Spinner thickness='6px' w={12} h={12} color='teal.300' />
          <Heading fontSize='4xl' color='gray.00'><Trans>Creating Your Post</Trans></Heading>
        </Stack>
      </PostPlaceholder>
    )
  }

  return (
    <CreatePostFilePicker uppy={uppy} />
  )
}
