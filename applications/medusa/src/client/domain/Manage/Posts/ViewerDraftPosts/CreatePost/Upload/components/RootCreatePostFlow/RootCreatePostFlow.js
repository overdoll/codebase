/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import {
  useToast, Flex, Spacer, Center, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay, useDisclosure, Box
} from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import type { Uppy } from '@uppy/core'
import FilePicker from '../FilePicker/FilePicker'
import DragOverFileInput from '../DragOverFileInput/DragOverFileInput'
import PostFlow from '../UpdatePost/UpdatePost'
import { StringParam, useQueryParam } from 'use-query-params'
import type RootCreatePostFlowQuery from '@//:artifacts/RootCreatePostFlowQuery.graphql'
import { useEffect, useState } from 'react'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

const RootCreatePostFlowQueryGQL = graphql`
  query RootCreatePostFlowQuery ($reference: String!) {
    post (reference: $reference) {
      __typename
    }
  }
`

const RootCreatePostFlowMutationGQL = graphql`
  mutation RootCreatePostFlowMutation {
    createPost {
      post {
        reference
      }
    }
  }
`

export default function RootCreatePostFlow ({ uppy, state, dispatch }: Props): Node {
  /*
  load URL params here into a query
  if nothing found or no URL params specified for id?=
  show the initial uploader
   */

  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const data = useLazyLoadQuery<RootCreatePostFlowQuery>(
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
            setPostReference(payload.createPost.post.reference)
            setValidPostFound(true)
            console.log('success')
          },
          onError () {
            console.log('error')
          }
        })
      }
    })
  }, [uppy])

  // Load the post into the creator on page refresh
  useEffect(() => {
    if (postData) {
      console.log('load post')
    }
  }, [])

  // Show a loading placeholder for post being created
  if (isCreatingPost) {
    return <>post being created</>
  }

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

  return (<PostFlow uppy={uppy} state={state} dispatch={dispatch} />)
}
