import { useEffect, useState } from 'react'
import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { CreatePostFlowFragment$key } from '@//:artifacts/CreatePostFlowFragment.graphql'
import { CreatePostFlowMutation$data } from '@//:artifacts/CreatePostFlowMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import CreatePostNewFilePicker
  from '@//:modules/content/HookedComponents/Upload/components/CreatePostNewFilePicker/CreatePostNewFilePicker'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import CreatePostOpening from '../CreatePostOpening/CreatePostOpening'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: CreatePostFlowFragment$key
}

const Fragment = graphql`
  fragment CreatePostFlowFragment on Club @argumentDefinitions(
    first: {type: Int, defaultValue: 5}
    after: {type: String}
  ) {
    id
    posts (first: $first, after: $after)
    @connection(key: "ClubPosts_posts") {
      __id
      edges {
        node {
          id
        }
      }
    }
  }
`

const Mutation = graphql`
  mutation CreatePostFlowMutation($clubId: ID!, , $connections: [ID!]!) {
    createPost(input: {clubId: $clubId}) {
      post @prependNode(connections: $connections, edgeTypeName: "createPostEdge") {
        id
        reference
      }
    }
  }
`

export default function CreatePostFlow ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [, setPostReference] = useQueryParam<string | null | undefined>('post')

  const {
    dispatch
  } = useSequenceContext()

  const uppy = useUppyContext()

  const [createPost, isCreatingPost] = useMutation(Mutation)

  const notify = useToast()

  const [created, setCreated] = useState(false)

  const connectionId = data.posts.__id

  const onCreatePost = (id): void => {
    dispatch({
      type: 'isSubmitted',
      value: false,
      transform: 'SET'
    })
    dispatch({
      type: 'isInReview',
      value: false,
      transform: 'SET'
    })
    createPost({
      variables: {
        clubId: id,
        connections: [connectionId]
      },
      onCompleted (data: CreatePostFlowMutation$data) {
        setCreated(true)
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
      club: data.id
    })
  }, [data.id])

  useEffect(() => {
    const callBackFn = (file): void => {
      if (file.source !== 'already-uploaded') {
        const club = uppy.getState().meta.club
        if (club != null) {
          onCreatePost(club)
        }
      }
    }

    uppy.once('file-added', callBackFn)
    return () => {
      uppy.off('file-added', callBackFn)
    }
  }, [uppy])

  if (created) {
    return (
      <CreatePostOpening />
    )
  }

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
    <CreatePostNewFilePicker uppy={uppy} />
  )
}
