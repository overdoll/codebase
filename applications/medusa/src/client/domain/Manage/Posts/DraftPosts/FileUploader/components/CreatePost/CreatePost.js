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
import CreatePostFlow from './CreatePostFlow/CreatePostFlow'

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

export default function CreatePost ({ uppy, state, dispatch }: Props): Node {
  const [postReference, setPostReference] = useQueryParam('id', StringParam)

  const data = useLazyLoadQuery<CreatePostQuery>(
    RootCreatePostFlowQueryGQL,
    { reference: postReference || '' }
  )

  const [t] = useTranslation('manage')

  const postData = data.post

  const onCleanup = () => {
    uppy.reset()
    dispatch({ type: EVENTS.CLEANUP, value: INITIAL_STATE })
    setPostReference(undefined)
  }

  // If there is no post found from the URL parameter, show create post initiator
  if (!postData && (state.step !== STEPS.SUBMIT)) {
    return (
      <Stack spacing={4}>
        <CreatePostFlow uppy={uppy} state={state} dispatch={dispatch} />
        <Box>
          <Heading color='gray.00' fontSize='xl'>
            {t('posts.flow.create.uploader.rules.heading')}
          </Heading>
          <Box ml={4}>
            <Text>{t('posts.flow.create.uploader.rules.rule_one')}</Text>
            <Text>{t('posts.flow.create.uploader.rules.rule_two')}</Text>
            <Text>{t('posts.flow.create.uploader.rules.rule_three')}</Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize='md' color='gray.100'>
            {t('posts.flow.create.uploader.rules.hint')}
          </Text>
          <CommunityGuidelines size='md' />
        </Box>
      </Stack>
    )
  }

  // If the post was already submitted
  if (postData?.state !== 'DRAFT' && state.step !== STEPS.SUBMIT) {
    return (
      <LargeBackgroundBox>
        <Flex h={400} direction='column' justify='center' align='center'>
          <Heading mb={8} textAlign='center' color='gray.00' fontSize='2xl'>
            {t('posts.flow.create.not_draft.title')}
          </Heading>
          <Button variant='solid' colorScheme='primary' onClick={onCleanup} size='lg'>
            {t('posts.flow.create.not_draft.button')}
          </Button>
        </Flex>
      </LargeBackgroundBox>
    )
  }

  // When there is a valid post we load the post creator flow
  return (
    <UpdatePostFlow
      uppy={uppy} state={state} dispatch={dispatch} query={data}
    />
  )
}
