/**
 * @flow
 */
import type { Node } from 'react'
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import {
  Flex, Box, Spinner, Heading, Text, useToast, Stack
} from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import FilePicker from '../FilePicker/FilePicker'
import DragOverFileInput from '../DragOverFileInput/DragOverFileInput'
import UpdatePostFlow from './UpdatePostFlow/UpdatePostFlow'
import { StringParam, useQueryParam } from 'use-query-params'
import type CreatePostQuery from '@//:artifacts/CreatePostQuery.graphql'
import { useEffect, useState } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../constants/constants'
import { useTranslation } from 'react-i18next'
import CommunityGuidelines from '../../../../../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import Button from '@//:modules/form/Button'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch
};

const RootCreatePostFlowQueryGQL = graphql`
  query CreatePostQuery ($reference: String!) {
    post (reference: $reference) {
      __typename
      state
    }
    ...UpdatePostFlowFragment
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

  const [createPost, isCreatingPost] = useMutation(RootCreatePostFlowMutationGQL)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const postData = data?.post

  // After the user initially uploads a file, we create a new post
  useEffect(() => {
    uppy.on('file-added', file => {
      if (!postData) {
        createPost({
          onCompleted (payload) {
            setPostReference(x => {
              return payload.createPost.post.reference
            })
          },
          onError () {
            notify({
              status: 'error',
              title: t('posts.flow.create.query.error'),
              isClosable: true
            })
          }
        })
      }
    })
  }, [uppy])

  const onCleanup = () => {
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
  }

  // Show a loading placeholder for post being created
  if (isCreatingPost) {
    return (
      <Flex h='100%' align='center' justify='center' direction='column'>
        <Spinner mb={6} thickness={4} size='lg' color='primary.500' />
        <Text size='sm' color='gray.100'>{t('posts.flow.create.creating')}</Text>
      </Flex>
    )
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (!postData && (state.step !== STEPS.SUBMIT)) {
    return (
      <Stack spacing={4}>
        <FilePicker uppy={uppy}>
          <DragOverFileInput uppy={uppy}>
            <LargeBackgroundBox>
              <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                h={400}
              >
                <Heading color='gray.00' fontSize='4xl'>
                  {t('posts.flow.create.uploader.title')}
                </Heading>
              </Flex>
            </LargeBackgroundBox>
          </DragOverFileInput>
        </FilePicker>
        <Box>
          <Heading color='gray.100' fontSize='xl'>
            {t('posts.flow.create.uploader.rules.heading')}
          </Heading>
          <Box ml={4}>
            <Text>{t('posts.flow.create.uploader.rules.rule_one')}</Text>
            <Text>{t('posts.flow.create.uploader.rules.rule_two')}</Text>
            <Text>{t('posts.flow.create.uploader.rules.rule_three')}</Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize='md' color='gray.200'>
            {t('posts.flow.create.uploader.rules.hint')}
          </Text>
          <CommunityGuidelines colorScheme='gray' size='md' />
        </Box>
      </Stack>
    )
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT' && state.step !== STEPS.SUBMIT) {
    return (
      <Flex direction='column' align='center'>
        <Heading mb={2} textAlign='center' fontSize='2xl'>
          {t('posts.flow.create.not_draft.title')}
        </Heading>
        <Button onClick={onCleanup} size='md'>
          {t('posts.flow.create.not_draft.button')}
        </Button>
      </Flex>
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <UpdatePostFlow
      uppy={uppy} state={state} dispatch={dispatch} query={data}
    />
  )
}
