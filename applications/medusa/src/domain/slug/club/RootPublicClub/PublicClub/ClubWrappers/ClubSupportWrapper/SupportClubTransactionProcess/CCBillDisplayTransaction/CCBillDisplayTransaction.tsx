import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CCBillDisplayTransactionQuery } from '@//:artifacts/CCBillDisplayTransactionQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Box, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { CheckMark, InfoCircle, RemoveCross, WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { ForwardedRef, useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'
import ContactButton from '../../../../../../../../../common/components/Contact/ContactButton'

interface Props extends ComponentSearchArguments<any> {
  loadQuery: () => void
  closeButtonRef: ForwardedRef<any>
}

const Query = graphql`
  query CCBillDisplayTransactionQuery($token: String!) {
    ccbillTransactionDetails(token: $token) {
      id
      approved
      declineError
      declineText
      linkedAccountClubSupporterSubscription {
        ... on IAccountClubSupporterSubscription {
          id
          reference
        }
        ... on AccountActiveClubSupporterSubscription {
          supporterSince
          paymentMethod {
            card {
              last4
              expiration
              type
            }
          }
          club {
            viewerMember {
              isSupporter
              clubSupporterSubscription {
                ...on IAccountClubSupporterSubscription {
                  reference
                }
              }
            }
          }
        }
      }
    }
  }
`

const TIMEOUT_LIMIT = 20

export default function CCBillDisplayTransaction ({
  searchArguments,
  loadQuery,
  closeButtonRef
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<CCBillDisplayTransactionQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const { onClose } = useHistoryDisclosureContext()

  const [, setTokenParam] = useQueryParam<string | null | undefined>('token')
  const [timeoutCount, setTimeoutCount] = useState(0)

  const onCancel = (): void => {
    setTokenParam(undefined)
  }

  const onComplete = (): void => {
    setTokenParam(undefined)
    onClose?.()
  }

  const isVerifying = queryData?.ccbillTransactionDetails?.approved === true &&
    queryData?.ccbillTransactionDetails.linkedAccountClubSupporterSubscription?.club?.viewerMember?.isSupporter !== true

  useEffect(() => {
    const interval = setInterval(() => {
      if (isVerifying) {
        loadQuery()
        setTimeoutCount((prev) => prev + 1)
      }
    }, 2500)

    if (!isVerifying) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isVerifying])

  if (queryData?.ccbillTransactionDetails == null) {
    return (
      <Stack w='100%' spacing={8}>
        <Icon
          icon={InfoCircle}
          w={20}
          h={20}
          fill='teal.300'
          ml='auto'
          mr='auto'
        />
        <Box>
          <Heading
            textAlign='center'
            size='md'
            color='gray.00'
          >
            <Trans>
              Transaction not found
            </Trans>
          </Heading>
          <Text
            align='center'
            size='sm'
            color='gray.100'
          >
            <Trans>
              Sorry, we couldn't find the transaction. Please try again later.
            </Trans>
          </Text>
        </Box>
        <Button ref={closeButtonRef} onClick={onCancel} size='lg' colorScheme='teal'>
          <Trans>
            Back
          </Trans>
        </Button>
      </Stack>
    )
  }

  if (!queryData.ccbillTransactionDetails.approved) {
    return (
      <Stack w='100%' spacing={4}>
        <Icon
          icon={RemoveCross}
          w={20}
          h={20}
          fill='orange.300'
          ml='auto'
          mr='auto'
        />
        <Box>
          <Heading textAlign='center' fontSize='2xl' color='gray.00'>
            <Trans>
              Transaction Declined
            </Trans>
          </Heading>
          <Text textAlign='center' fontSize='md' color='gray.100'>
            <Trans>
              Sorry, we were unable to process your payment. Please try another payment method.
            </Trans>
          </Text>
          <Stack spacing={2}>
            <HStack spacing={2}>
              <Text
                fontSize='sm'
                color='gray.100'
              >
                <Trans>
                  Error
                </Trans>
              </Text>
              <Text
                fontSize='sm'
                color='gray.00'
              >
                {queryData.ccbillTransactionDetails.declineError}
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Text
                fontSize='sm'
                color='gray.100'
              >
                <Trans>
                  Description
                </Trans>
              </Text>
              <Text
                fontSize='sm'
                color='gray.00'
              >
                {queryData.ccbillTransactionDetails.declineText}
              </Text>
            </HStack>
            <Stack spacing={2}>
              <Text
                fontSize='sm'
                color='gray.200'
              >
                <Trans>
                  Please contact us if you continue to experience billing issues
                </Trans>
              </Text>
              <ContactButton />
            </Stack>
          </Stack>
        </Box>
        <Button ref={closeButtonRef} onClick={onCancel} size='lg' colorScheme='orange'>
          <Trans>
            Back
          </Trans>
        </Button>
      </Stack>
    )
  }

  if (timeoutCount >= TIMEOUT_LIMIT && isVerifying) {
    return (
      <Stack w='100%' spacing={4}>
        <Icon
          icon={WarningTriangle}
          w={20}
          h={20}
          fill='orange.300'
          ml='auto'
          mr='auto'
        />
        <Box>
          <Heading textAlign='center' fontSize='2xl' color='gray.00'>
            <Trans>
              Pending Club Benefits
            </Trans>
          </Heading>
          <Text textAlign='center' fontSize='md' color='gray.100'>
            <Trans>
              We received your payment, but weren't able to issue your club benefits in a reasonable amount of time.
              Try refreshing the page or coming back in a few minutes and you should see your club benefits!
            </Trans>
          </Text>
        </Box>
        <Stack spacing={2}>
          <Text
            fontSize='md'
            color='gray.200'
          >
            <Trans>
              Please contact us if you continue to experience issues with receiving your club benefits
            </Trans>
          </Text>
          <ContactButton />
        </Stack>
        <Button ref={closeButtonRef} onClick={onComplete} size='lg' colorScheme='orange'>
          <Trans>
            Close
          </Trans>
        </Button>
      </Stack>
    )
  }

  if (isVerifying) {
    return (
      <Stack w='100%' align='center' spacing={4}>
        <Spinner thickness='4px' w={20} h={20} color='green.300' />
        <Box>
          <Heading textAlign='center' fontSize='2xl' color='gray.00'>
            <Trans>
              Verifying Transaction
            </Trans>
          </Heading>
          <Text textAlign='center' fontSize='md' color='gray.100'>
            <Trans>
              We've received your payment! Now we're issuing your club benefits. This page will update shortly.
            </Trans>
          </Text>
          {timeoutCount >= (TIMEOUT_LIMIT / 2) && (
            <Text textAlign='center' fontSize='sm' color='gray.300'>
              <Trans>
                Attempt {timeoutCount} of {TIMEOUT_LIMIT}...
              </Trans>
            </Text>
          )}
        </Box>
      </Stack>
    )
  }

  return (
    <Stack w='100%' spacing={4}>
      <Icon
        icon={CheckMark}
        w={20}
        h={20}
        fill='green.300'
        ml='auto'
        mr='auto'
      />
      <Box>
        <Heading textAlign='center' fontSize='2xl' color='gray.00'>
          <Trans>
            Transaction Approved!
          </Trans>
        </Heading>
        <Text textAlign='center' fontSize='md' color='gray.100'>
          <Trans>
            You can start using your club benefits right away!
          </Trans>
        </Text>
      </Box>
      <Button ref={closeButtonRef} onClick={onComplete} size='lg' colorScheme='green'>
        <Trans>
          Close
        </Trans>
      </Button>
    </Stack>
  )
}
