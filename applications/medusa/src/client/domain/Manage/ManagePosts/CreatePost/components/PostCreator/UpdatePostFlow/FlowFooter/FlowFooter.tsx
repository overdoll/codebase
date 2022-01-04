import { Flex, Spacer } from '@chakra-ui/react'
import { STEPS } from '../../../../constants/constants'
import FlowBackwardButton from './FlowBackwardButton/FlowBackwardButton'
import FlowForward from './FlowForward/FlowForward'
import { graphql } from 'react-relay/hooks'
import type { FlowFooterFragment$key } from '@//:artifacts/FlowFooterFragment.graphql'
import { useFragment } from 'react-relay'
import { useContext } from 'react'
import { StateContext } from '../../../../context'

interface Props {
  query: FlowFooterFragment$key
}

const Fragment = graphql`
  fragment FlowFooterFragment on Post {
    ...FlowForwardButtonFragment
  }
`

export default function FlowFooter ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const state = useContext(StateContext)

  if (state.step !== STEPS.SUBMIT) {
    return (
      <Flex w='100%' bottom={0} position='sticky'>
        <FlowBackwardButton />
        <Spacer />
        <FlowForward
          query={data}
        />
      </Flex>
    )
  }
  return (
    <></>
  )
}
