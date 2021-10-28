/**
 * @flow
 */
import type { Node } from 'react'
import { EVENTS, INITIAL_STATE, STEPS } from '../../../constants/constants'
import { graphql, useMutation } from 'react-relay/hooks'
import type { Dispatch, State } from '@//:types/upload'
import { Flex, Stack, Box, AlertIcon, AlertDescription, Alert } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import Button from '@//:modules/form/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FlowHeader from './FlowHeader/FlowHeader'
import FlowSteps from './FlowSteps/FlowSteps'
import type UpdatePostFlowContentMutation from '@//:artifacts/UpdatePostFlowContentMutation.graphql'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import type { UpdatePostFlowTagFragment$key } from '@//:artifacts/UpdatePostFlowTagFragment.graphql'

import FlowFooter from './FlowFooter/FlowFooter'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: {
    post: UpdatePostFlowFragment$key,
    tag: UpdatePostFlowTagFragment$key
  }
};

const UpdatePostFlowFragmentGQL = graphql`
  fragment UpdatePostFlowFragment on Post {
    ...FlowStepsFragment
    ...FlowFooterFragment
  }
`

const UpdatePostFlowTagFragmentGQL = graphql`
  fragment UpdatePostFlowTagFragment on Query {
    ...FlowStepsTagFragment
  }
`

// Stepper - handles all stepping functions
export default function UpdatePostFlow ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(UpdatePostFlowFragmentGQL, query.post)
  const tagData = useFragment(UpdatePostFlowTagFragmentGQL, query.tag)

  const [t] = useTranslation('manage')

  return (
    <Stack spacing={4}>
      <Box>
        <FlowHeader uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Box>
      <Stack spacing={2}>
        <FlowSteps uppy={uppy} dispatch={dispatch} state={state} query={{ post: data, tag: tagData }} />
      </Stack>
      <Flex justify='center'>
        <FlowFooter uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Flex>
    </Stack>
  )
}
