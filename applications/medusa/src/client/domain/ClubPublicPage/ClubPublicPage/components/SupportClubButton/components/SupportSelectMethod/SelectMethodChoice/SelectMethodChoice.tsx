import type { SelectMethodChoiceViewerFragment$key } from '@//:artifacts/SelectMethodChoiceViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'
import { useContext } from 'react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { Choice, useChoice } from '@//:modules/content/HookedComponents/Choice'

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
      <Stack spacing={4}>
        <Box>
          <Choice {...register('existing_payment', {})}>
            <Button>
              <Trans>
                Select an existing payment method ({viewerData.savedPaymentMethods.edges.length})
              </Trans>
            </Button>
            <Text fontSize='sm' color='gray.300'>
              <Trans>
                You will be asked to subscribe using an existing payment method
              </Trans>
            </Text>
          </Choice>
        </Box>
        <Box>
          <Choice {...register('new_payment', {})}>
            <Button>
              <Trans>
                Use a new payment method
              </Trans>
            </Button>
            <Text fontSize='sm' color='gray.300'>
              <Trans>
                You will be asked to enter your payment information and subscribe through our billing provider
              </Trans>
            </Text>
          </Choice>
        </Box>
      </Stack>
      <Flex justify='flex-end'>
        <Button
          onClick={onClick}
          isDisabled={isDisabled}
          colorScheme='gray'
          size='md'
        >
          <Trans>
            Next
          </Trans>
        </Button>
      </Flex>
    </Stack>
  )
}
