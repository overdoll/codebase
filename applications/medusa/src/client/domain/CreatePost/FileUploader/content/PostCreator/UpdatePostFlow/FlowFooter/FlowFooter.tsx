import type { Dispatch, State } from '@//:types/upload'
import { Flex, Spacer } from '@chakra-ui/react'
import { STEPS } from '../../../../constants/constants'
import type { Uppy } from '@uppy/core'
import FlowBackwardButton from './FlowBackwardButton/FlowBackwardButton'
import FlowForward from './FlowForward/FlowForward'
import { graphql } from 'react-relay/hooks'
import type { FlowFooterFragment$key } from '@//:artifacts/FlowFooterFragment.graphql'
import { useFragment } from 'react-relay'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: FlowFooterFragment$key
}

const Fragment = graphql`
  fragment FlowFooterFragment on Post {
    ...FlowForwardButtonFragment
  }
`

export default function FlowFooter ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (state.step !== STEPS.SUBMIT) {
    return (
      <Flex w='100%' bottom={0} position='sticky'>
        <FlowBackwardButton dispatch={dispatch} state={state} />
        <Spacer />
        <FlowForward
          uppy={uppy}
          dispatch={dispatch}
          state={state}
          query={data}
        />
      </Flex>
    )
  }
  return (
    <></>
  )
}
