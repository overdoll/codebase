import { STEPS } from '../../../constants/constants'
import { graphql } from 'react-relay/hooks'
import { Box, Flex, Stack } from '@chakra-ui/react'
import FlowHeader from './FlowHeader/FlowHeader'
import FlowSteps from './FlowSteps/FlowSteps'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'

import FlowFooter from './FlowFooter/FlowFooter'
import { useContext } from 'react'
import { StateContext } from '../../../context'

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
  const state = useContext(StateContext)

  return (
    <Stack spacing={4}>
      {state.step !== STEPS.SUBMIT &&
        <Box>
          <FlowHeader query={data} />
        </Box>}
      <Stack spacing={2}>
        <FlowSteps query={data} />
      </Stack>
      <Flex justify='center'>
        <FlowFooter query={data} />
      </Flex>
    </Stack>
  )
}
