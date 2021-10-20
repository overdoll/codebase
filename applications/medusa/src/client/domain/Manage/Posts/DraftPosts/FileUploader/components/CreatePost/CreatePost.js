/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import {
  Flex, Center, Box
} from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import FilePicker from '../FilePicker/FilePicker'
import DragOverFileInput from '../DragOverFileInput/DragOverFileInput'
import UpdatePostFlow from '../UpdatePostFlow/UpdatePostFlow'
import { StringParam, useQueryParam } from 'use-query-params'
import type CreatePostQuery from '@//:artifacts/CreatePostQuery.graphql'
import { useEffect, useState } from 'react'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

const RootCreatePostFlowQueryGQL = graphql`
  query CreatePostQuery ($reference: String!) {
    post (reference: $reference) {
      __typename
    }
  }
`

const RootCreatePostFlowMutationGQL = graphql`
  mutation CreatePostMutation {
    createPost {
      post {
        reference
      }
    }
  }
`

export default function CreatePost ({ uppy, state, dispatch }: Props): Node {
  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const data = useLazyLoadQuery<CreatePostQuery>(
    RootCreatePostFlowQueryGQL,
    { reference: postReference || '' }
  )

  const postData = data?.post

  const [createPost, isCreatingPost] = useMutation(RootCreatePostFlowMutationGQL)

  const [validPostFound, setValidPostFound] = useState(!!postData)

  // After the user initially uploads a file, we create a new post
  useEffect(() => {
    uppy.on('file-added', file => {
      if (!validPostFound) {
        createPost({
          onCompleted (payload) {
            setPostReference(x => {
              setValidPostFound(!!payload.createPost.post)
              return payload.createPost.post.reference
            })

            console.log('success')
          },
          onError () {
            console.log('error')
          }
        })
      }
    })
  }, [uppy])

  // Show a loading placeholder for post being created
  if (isCreatingPost) {
    return <>post being created</>
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (!validPostFound) {
    return (
      <Center>
        <FilePicker uppy={uppy}>
          <DragOverFileInput uppy={uppy}>
            <Box
              w='100%' boxShadow='md' bg='gray.800' p={4}
              borderRadius={15}
            >
              <Box p={4} borderRadius={15} borderStyle='dashed' borderColor='gray.50' borderWidth={4}>
                <Flex ml={2} mr={2} mt={12} mb={12} flexDirection='column' alignItems='center' />
              </Box>
            </Box>
          </DragOverFileInput>
        </FilePicker>
      </Center>
    )
  }

  // When there is a valid post we load the post creator flow
  return (<UpdatePostFlow uppy={uppy} state={state} dispatch={dispatch} />)
}
