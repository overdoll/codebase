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
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'

import FlowFooter from './FlowFooter/FlowFooter'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: UpdatePostFlowFragment$key,
};

const UpdatePostFlowFragmentGQL = graphql`
  fragment UpdatePostFlowFragment on Query {
    ...FlowStepsFragment
    ...FlowFooterFragment
    ...FlowHeaderFragment
  }
`

// Stepper - handles all stepping functions
export default function UpdatePostFlow ({ uppy, state, dispatch, query }: Props): Node {
  const data = useFragment(UpdatePostFlowFragmentGQL, query)

  return (
    <Stack spacing={4}>
      {state.step !== STEPS.SUBMIT &&
        <Box>
          <FlowHeader uppy={uppy} dispatch={dispatch} state={state} query={data} />
        </Box>}
      <Stack spacing={2}>
        <FlowSteps uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Stack>
      <Flex justify='center'>
        <FlowFooter uppy={uppy} dispatch={dispatch} state={state} query={data} />
      </Flex>
    </Stack>
  )
}
