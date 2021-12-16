/**
 * @flow
 */
import type { Node } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import { Flex, Spacer } from '@chakra-ui/react'
import { STEPS } from '../../../../constants/constants'
import type { Uppy } from '@uppy/core'
import FlowBackwardButton from './FlowBackwardButton/FlowBackwardButton'
import FlowForwardButton from './FlowForwardButton/FlowForwardButton'
import { graphql } from 'react-relay/hooks'
import type { FlowFooterFragment$key } from '@//:artifacts/FlowFooterFragment.graphql'
import { useFragment } from 'react-relay'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: FlowFooterFragment$key
}

const FlowFooterFragmentGQL = graphql`
  fragment FlowFooterFragment on Query {
    post (reference: $reference) {
      ...FlowForwardButtonFragment
    }
  }
`

export default function FlowFooter ({ state, uppy, dispatch, query }: Props): Node {
  const data = useFragment(FlowFooterFragmentGQL, query)

  if (state.step !== STEPS.SUBMIT) {
    return (
      <Flex w='100%' bottom={0} position='sticky'>
        <FlowBackwardButton uppy={uppy} dispatch={dispatch} state={state} />
        <Spacer />
        <FlowForwardButton uppy={uppy} dispatch={dispatch} state={state} query={data.post} />
      </Flex>
    )
  }
  return (
    <></>
  )
}
