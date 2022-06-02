import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'
import { Box, ButtonGroup, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'
import { useQueryParam } from 'use-query-params'

interface Props {
  windowReference: MutableRefObject<Window | null>
  originLink: string | null
  updateOriginLink: Dispatch<SetStateAction<string | null>>
}

export default function CCBillWindowListener ({
  windowReference,
  originLink,
  updateOriginLink
}: Props): JSX.Element {
  const { isOpen } = useHistoryDisclosureContext()

  const [, setTokenParam] = useQueryParam<string | null | undefined>('token')

  // Only allow messages from a specific window source
  const messageEvent = (event): void => {
    if (event.origin !== originLink && event.origin !== '127.0.0.1') {
      return
    }

    if (event.data.source !== 'overdoll-ccbill-flexforms-payment-flow') {
      return
    }
    setTokenParam(event.data.payload.token)
    closeWindow()
  }

  const openWindow = (): void => {
    if (windowReference.current == null) return
    windowReference.current?.focus()
  }

  const closeWindow = (): void => {
    if (windowReference.current == null) return
    windowReference.current?.close()
  }

  const cancelFlow = (): void => {
    closeWindow()
    updateOriginLink(null)
    windowReference.current = null
  }

  // Listen for window close
  useEffect(() => {
    if (windowReference?.current?.closed === true) return
    const refreshLoop = (): void => {
      if (windowReference?.current?.closed === true) {
        cancelFlow()
      }
      setTimeout(refreshLoop, 500)
    }

    setTimeout(refreshLoop, 500)
  }, [windowReference.current])

  // Add event listener for the open window
  useEffect(() => {
    window.addEventListener('message', messageEvent)

    return () => {
      window.removeEventListener('message', messageEvent)
    }
  }, [originLink])

  // If the modal is closed we want to close the window
  useEffect(() => {
    if (windowReference?.current?.closed === false && !isOpen) {
      cancelFlow()
    }
  }, [isOpen])

  return (
    <Stack align='center' spacing={8}>
      <Box>
        <Heading textAlign='center' fontSize='2xl' color='gray.00'>
          <Trans>
            Enter your payment details in the new window
          </Trans>
        </Heading>
        <Text textAlign='center' fontSize='md' color='gray.200'>
          <Trans>
            This page will update after you have successfully submitted your payment details
          </Trans>
        </Text>
      </Box>
      <Spinner thickness='4px' w={20} h={20} color='teal.300' />
      <ButtonGroup spacing={4} size='lg' variant='solid'>
        <Button onClick={cancelFlow}>
          <Trans>
            Cancel
          </Trans>
        </Button>
        <Button onClick={openWindow} colorScheme='teal'>
          <Trans>
            Show Window
          </Trans>
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
