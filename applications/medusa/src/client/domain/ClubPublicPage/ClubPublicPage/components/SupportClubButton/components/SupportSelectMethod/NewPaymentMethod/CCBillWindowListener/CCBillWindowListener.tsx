import { Dispatch, MutableRefObject, SetStateAction, Suspense, useEffect } from 'react'
import { Box, ButtonGroup, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import QueryErrorBoundary
  from '../../../../../../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import CCBillDisplayTransaction from './CCBillDisplayTransaction/CCBillDisplayTransaction'

interface Props {
  windowReference: MutableRefObject<Window | null>
  originLink: string | null
  updateOriginLink: Dispatch<SetStateAction<string | null>>
}

interface SearchProps {
  transactionToken: string | null
}

export default function CCBillWindowListener ({
  windowReference,
  originLink,
  updateOriginLink
}: Props): JSX.Element {
  const {
    searchArguments,
    setArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      transactionToken: null
    }
  })

  // Only allow messages from a specific window source
  const messageEvent = (event): void => {
    if (event.origin !== origin) {
      return
    }

    if (event.data.source !== 'overdoll-ccbill-flexforms-payment-flow') {
      return
    }

    setArguments({ transactionToken: event.data.payload.token })
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
      if (windowReference?.current?.closed === true && searchArguments.variables.transactionToken == null) {
        cancelFlow()
        return
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

  if (searchArguments.variables.transactionToken != null) {
    return (
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <CCBillDisplayTransaction searchArguments={searchArguments} />
        </Suspense>
      </QueryErrorBoundary>
    )
  }

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
      <Spinner thickness='4px' w={20} h={20} color='teal.400' />
      <ButtonGroup spacing={4} size='lg' variant='solid'>
        <Button onClick={cancelFlow}>
          <Trans>
            Cancel
          </Trans>
        </Button>
        <Button onClick={openWindow} colorScheme='teal'>
          <Trans>
            Open Window
          </Trans>
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
