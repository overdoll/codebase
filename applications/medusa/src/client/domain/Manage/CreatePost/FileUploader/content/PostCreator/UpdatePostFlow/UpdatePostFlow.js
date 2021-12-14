/**
 * @flow
 */
import type { Node } from 'react'
import { STEPS } from '../../../constants/constants'
import { graphql } from 'react-relay/hooks'
import type { Dispatch, State } from '../../../../../../../../types/upload'
import { Box, Flex, Stack } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
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
