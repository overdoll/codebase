import { STEPS } from '../../../constants/constants'
import { graphql } from 'react-relay/hooks'
import { Box, Flex, Stack } from '@chakra-ui/react'
import FlowHeader from './FlowHeader/FlowHeader'
import FlowSteps from './FlowSteps/FlowSteps'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'

import FlowFooter from './FlowFooter/FlowFooter'
import { useContext } from 'react'
import { DispatchContext, StateContext, UppyContext } from '../../../context'

interface Props {
  query: UpdatePostFlowFragment$key
}

const UpdatePostFlowFragmentGQL = graphql`
  fragment UpdatePostFlowFragment on Post {
    ...FlowStepsFragment
    ...FlowFooterFragment
    ...FlowHeaderFragment
  }
`

export default function UpdatePostFlow ({
  query
}: Props): JSX.Element {
  const data = useFragment(UpdatePostFlowFragmentGQL, query)

  const uppy = useContext(UppyContext)
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  return (
    <Stack spacing={4}>
      {state.step !== STEPS.SUBMIT &&
        <Box>
          <FlowHeader query={data} />
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
