import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { CCBillDisplayTransactionQuery } from '@//:artifacts/CCBillDisplayTransactionQuery.graphql'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Box, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { CheckMark, InfoCircle, RemoveCross } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { useEffect } from 'react'

interface Props extends ComponentSearchArguments<any> {
  loadQuery: () => void
  onClose: () => void
}

const Query = graphql`
  query CCBillDisplayTransactionQuery($token: String!) {
    ccbillTransactionDetails(token: $token) {
      id
      approved
      declineError
      declineText
      linkedAccountClubSupporterSubscription {
        id
        status
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
          }
        }
      }
    }
  }
`

export default function CCBillDisplayTransaction ({
  searchArguments,
  loadQuery,
  onClose
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<CCBillDisplayTransactionQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  useEffect(() => {
    if (queryData?.ccbillTransactionDetails?.linkedAccountClubSupporterSubscription != null) return
    const refreshLoop = (): void => {
      if (queryData?.ccbillTransactionDetails?.linkedAccountClubSupporterSubscription != null) return
      loadQuery()
      setTimeout(refreshLoop, 2500)
    }
    setTimeout(refreshLoop, 2500)
  }, [queryData?.ccbillTransactionDetails?.linkedAccountClubSupporterSubscription])

  if (queryData?.ccbillTransactionDetails == null) {
    return (
      <Stack spacing={8}>
        <Icon
          icon={InfoCircle}
          w={20}
          h={20}
          fill='teal.400'
          ml='auto'
          mr='auto'
        />
        <Box>
          <Heading
            align='center'
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
        <Button onClick={onClose} size='lg' colorScheme='teal'>
          <Trans>
            Close
          </Trans>
        </Button>
      </Stack>
    )
  }

  if (!queryData.ccbillTransactionDetails.approved) {
    return (
      <Stack spacing={4}>
        <Icon
          icon={RemoveCross}
          w={20}
          h={20}
          fill='orange.400'
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
                size='sm'
                color='gray.100'
              >
                <Trans>
                  Error
                </Trans>
              </Text>
              <Text
                size='sm'
                color='gray.00'
              >
                {queryData.ccbillTransactionDetails.declineError}
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Text
                size='sm'
                color='gray.100'
              >
                <Trans>
                  Description
                </Trans>
              </Text>
              <Text
                size='sm'
                color='gray.00'
              >
                {queryData.ccbillTransactionDetails.declineText}
              </Text>
            </HStack>
          </Stack>
        </Box>
        <Button onClick={onClose} size='lg' colorScheme='orange'>
          <Trans>
            Close
          </Trans>
        </Button>
      </Stack>
    )
  }

  if (queryData.ccbillTransactionDetails.approved &&
    queryData.ccbillTransactionDetails.linkedAccountClubSupporterSubscription?.club?.viewerMember?.isSupporter !== true) {
    return (
      <Stack align='center' spacing={4}>
        <Spinner thickness='4px' w={20} h={20} color='green.400' />
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
        </Box>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      <Icon
        icon={CheckMark}
        w={20}
        h={20}
        fill='green.400'
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
      <Button onClick={onClose} size='lg' colorScheme='green'>
        <Trans>
          Close
        </Trans>
      </Button>
    </Stack>
  )
}
