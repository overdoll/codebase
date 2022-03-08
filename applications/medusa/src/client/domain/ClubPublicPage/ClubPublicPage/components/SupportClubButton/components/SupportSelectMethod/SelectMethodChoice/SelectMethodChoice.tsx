import type { SelectMethodChoiceViewerFragment$key } from '@//:artifacts/SelectMethodChoiceViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Center, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'
import { useContext } from 'react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'

interface Props {
  viewerQuery: SelectMethodChoiceViewerFragment$key
}

const ViewerFragment = graphql`
  fragment SelectMethodChoiceViewerFragment on Account {
    __typename
    savedPaymentMethods {
      edges {
        node {
          __typename
        }
      }
    }
  }
`

export default function SelectMethodChoice ({
  viewerQuery
}: Props): JSX.Element {
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const { onClose } = useHistoryDisclosureContext()

  const {
    values,
    register
  } = useChoice<{}>({
    max: 1
  })

  const {
    skipToStep
  } = useContext(FlowContext)

  const isDisabled = Object.keys(values).length < 1

  const onClick = (): void => {
    skipToStep(Object.keys(values)[0])
  }

  return (
    <Stack spacing={8}>
      <Heading align='center' fontSize='2xl' color='gray.00'>
        <Trans>
          How will you pay?
        </Trans>
      </Heading>
      <Stack spacing={4}>
        <Box>
          <Choice {...register('existing_payment', {})}>
            <LargeBackgroundBox bg='gray.900'>
              <Center>
                <Heading color='gray.00' fontSize='xl' align='center'>
                  <Trans>
                    Use a saved payment method ({viewerData.savedPaymentMethods.edges.length})
                  </Trans>
                </Heading>
              </Center>
            </LargeBackgroundBox>
          </Choice>
          <Text fontSize='sm' color='gray.300'>
            <Trans>
              You will be asked to subscribe using an existing payment method
            </Trans>
          </Text>
        </Box>
        <Box>
          <Choice {...register('new_payment', {})}>
            <LargeBackgroundBox bg='gray.900'>
              <Center>
                <Heading color='gray.00' fontSize='xl' align='center'>
                  <Trans>
                    Enter a new payment method
                  </Trans>
                </Heading>
              </Center>
            </LargeBackgroundBox>
          </Choice>
          <Text fontSize='sm' color='gray.300'>
            <Trans>
              You will be asked to enter your payment information and subscribe through our billing provider
            </Trans>
          </Text>
        </Box>
      </Stack>
      <HStack spacing={3} justify='space-between'>
        <Button
          onClick={onClose}
          colorScheme='gray'
          size='lg'
        >
          <Trans>
            Cancel
          </Trans>
        </Button>
        <Button
          onClick={onClick}
          isDisabled={isDisabled}
          colorScheme={isDisabled ? 'gray' : 'green'}
          size='lg'
          w='100%'
        >
          <Trans>
            Next
          </Trans>
        </Button>
      </HStack>
    </Stack>
  )
}
