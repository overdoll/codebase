import { Alert, AlertDescription, AlertIcon, Collapse, Flex, HStack, Stack } from '@chakra-ui/react'
import { STEPS } from '../../../../constants/constants'
import FlowBackwardButton from './FlowBackwardButton/FlowBackwardButton'
import FlowForward from './FlowForward/FlowForward'
import { graphql } from 'react-relay/hooks'
import type { FlowFooterFragment$key } from '@//:artifacts/FlowFooterFragment.graphql'
import { useFragment } from 'react-relay'
import { useContext } from 'react'
import { StateContext } from '../../../../context'
import { Trans } from '@lingui/macro'

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
      <Flex w='100%' bottom={0}>
        <Stack w='100%' spacing={2}>
          <HStack w='100%' spacing={4}>
            <FlowBackwardButton />
            <FlowForward
              query={data}
            />
          </HStack>
          <Collapse in={state.isProcessing && state.step === STEPS.CHARACTER}>
            <Alert status='info'>
              <AlertIcon />
              <AlertDescription>
                <Trans>
                  Please wait for your post content to finish processing before continuing.
                </Trans>
              </AlertDescription>
            </Alert>
          </Collapse>
        </Stack>
      </Flex>
    )
  }
  return (
    <></>
  )
}
