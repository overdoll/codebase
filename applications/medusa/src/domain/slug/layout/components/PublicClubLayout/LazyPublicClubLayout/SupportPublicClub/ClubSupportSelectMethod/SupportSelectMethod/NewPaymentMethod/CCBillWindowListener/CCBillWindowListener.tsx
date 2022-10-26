import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'
import { Box, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useQueryParam } from 'use-query-params'
import SecureText from '../../SecureText/SecureText'

interface Props {
  windowReference: MutableRefObject<Window | null>
  originLink: string | null
  updateOriginLink: Dispatch<SetStateAction<string | null>>
}

export default function CCBillWindowListener (props: Props): JSX.Element {
  const {
    windowReference,
    originLink,
    updateOriginLink
  } = props

  const [, setTokenParam] = useQueryParam<string | null | undefined>('token')
  const [supportParam] = useQueryParam<boolean | null | undefined>('support')

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
    if (windowReference?.current?.closed === false && supportParam == null) {
      cancelFlow()
    }
  }, [supportParam])

  return (
    <Stack spacing={10}>
      <Box>
        <Heading fontSize='4xl' color='gray.00'>
          <Trans>
            Enter your payment details in the new window.
          </Trans>
        </Heading>
        <Text fontSize='md' color='gray.200'>
          <Trans>
            This page will update after you have successfully submitted your payment details
          </Trans>
        </Text>
      </Box>
      <Stack align='center' spacing={10}>
        <Spinner thickness='8px' w={20} h={20} color='orange.300' />
        <Stack w='100%' align='center' spacing={2}>
          <HStack justify='space-between' w='100%' spacing={4}>
            <Button size='lg' onClick={cancelFlow}>
              <Trans>
                Cancel
              </Trans>
            </Button>
            <Button size='lg' w='100%' onClick={openWindow} colorScheme='orange'>
              <Trans>
                Show Window
              </Trans>
            </Button>
          </HStack>
          <SecureText />
        </Stack>
      </Stack>
    </Stack>
  )
}
