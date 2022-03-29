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
import NumberBadge from '../../../../../../../components/ContentHints/NumberBadge/NumberBadge'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

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
    isSecure
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
      <HStack justify='space-between' align='center' spacing={2}>
        <Heading fontSize='xl' color='gray.00'>
          <Trans>
            How will you pay?
          </Trans>
        </Heading>
        <CloseButton size='sm' onClick={onClose} />
      </HStack>
      <Stack spacing={4}>
        <Box>
          <Choice isDisabled={!viewerData.isSecure} {...register('existing_payment', {})}>
            <LargeBackgroundBox bg='gray.900'>
              <Center>
                <HStack spacing={2}>
                  <Heading color='gray.00' fontSize='xl' align='center'>
                    <Trans>
                      Use a saved payment method
                    </Trans>
                  </Heading>
                  <NumberBadge size='md' value={viewerData.savedPaymentMethods.edges.length} colorScheme='green' />
                </HStack>
              </Center>
            </LargeBackgroundBox>
          </Choice>
          {!viewerData.isSecure
            ? (
              <Alert mt={1} status='warning'>
                <HStack spacing={4} justify='space-between'>
                  <HStack>
                    <AlertIcon />
                    <AlertDescription>
                      <Trans>
                        You must enable two-factor authentication before you can use a saved payment method
                      </Trans>
                    </AlertDescription>
                  </HStack>
                  <LinkButton
                    size='sm'
                    colorScheme='orange'
                    variant='solid'
                    to='/settings/security'
                  >
                    <Trans>
                      Set Up
                    </Trans>
                  </LinkButton>
                </HStack>
              </Alert>)
            : (
              <Text fontSize='sm' color='gray.300'>
                <Trans>
                  You will be asked to subscribe using an existing payment method
                </Trans>
              </Text>)}
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
    </Stack>
  )
}
