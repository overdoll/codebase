/**
 * @flow
 */
import { graphql, useMutation, useSubscription } from 'react-relay/hooks'
import type { Node } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LobbySubscriptionResponse } from '@//:artifacts/LobbySubscription.graphql'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg'
import { Box, Center, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/button'

type Props = {
  onReceive: () => void,
  email: ?string,
};

// TODO: not resolved because it was deleted - need to re-implement in the future
const LobbySubscriptionGQL = graphql`
  subscription LobbySubscription {
    authListener {
      sameSession
      cookie {
        registered
      }
    }
  }
`

const LobbyEmail = graphql`
  mutation LobbyMutation {
    authEmail
  }
`

export default function Lobby (props: Props): Node {
  const notify = useToast()
  const [t] = useTranslation('auth')

  useSubscription<LobbySubscriptionResponse>(
    useMemo(
      () => ({
        variables: {},
        subscription: LobbySubscriptionGQL,

        // Received a subscription response
        onNext: (response: ?LobbySubscriptionResponse) => {
          // If the cookie was redeemed in the same browser session, and user is registered, refresh the page
          if (
            response?.authListener?.sameSession &&
            !!response?.authListener?.cookie?.registered
          ) {
            window.location.reload()
          } else {
            props.onReceive(response)
          }
        },

        // Subscription error - show to user
        onError: () => {
          notify({
            status: 'error',
            title: t('lobby.error'),
            isClosable: true
          })
        }
      }),
      []
    )
  )

  const [sendEmail, isSendingEmail] = useMutation(LobbyEmail)

  // Create a timer and state change for button
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [timer, setTimer] = useState(0)

  const onSubmit = () => {
    sendEmail({
      variables: {},
      onCompleted (data) {
        notify({
          status: 'success',
          title: t('lobby.verification'),
          isClosable: true
        })
        timeOut(60000)
      },
      onError (data) {}
    })
  }

  // Create and set timer for specified timeOut length
  // TODO make it a separate reusable function
  // TODO localstorage variable to make sure it cant be pressed on refresh again
  const timeOut = timeOutLength => {
    setButtonDisabled(true)
    setTimer(timeOutLength / 1000)
    const interval = setInterval(() => {
      setTimer(x => x - 1)
    }, 1000)
    setTimeout(() => {
      clearTimeout(interval)
    }, timeOutLength)
  }

  // Clear timer when it reaches a certain number
  const clearTimeout = interval => {
    setButtonDisabled(false)
    clearInterval(interval)
  }

  return (
    <Center mt={40}>
      <Flex w={['sm', 'md']} direction='column'>
        <Icon
          icon={SignBadgeCircle}
          w={100}
          h={100}
          color='purple.300'
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading mb={8} align='center' size='lg' color='gray.00'>
          {t('lobby.header')}
        </Heading>
        <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
          <Center>
            <Text fontSize='lg' color='purple.300'>
              {props.email}
            </Text>
          </Center>
        </Box>
        <Button
          size='lg'
          loading={isSendingEmail}
          onClick={onSubmit}
          disabled={buttonDisabled}
        >
          {t('lobby.resend') + (!buttonDisabled ? '' : ` (${timer})`)}
        </Button>
      </Flex>
    </Center>
  )
}
