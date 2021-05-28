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
import ContentInkPen from '@streamlinehq/streamlinehq/img/streamline-bold/content-ink-pen-jHW3zi.svg'
import { Box, Center, Flex, Heading, Text, useToast, Button } from '@chakra-ui/react'

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
    <Center mt={8}>
      <Flex w={['fill', 400]} direction='column'>
        <Icon
          icon={SignBadgeCircle}
          color='purple.300'
          pt='6'
          pb='7'
          align='center'
        />
        <Heading size='lg' align='center'>
          {t('lobby.header')}
        </Heading>
        <Box
          backgroundColor='gray.700'
          mt='6'
          p='3'
          align='center'
          position='relative'
        >
          <Text fontWeight='bold' color='purple.300'>
            {props.email}
          </Text>
          <Icon
            icon={ContentInkPen}
            // delete cookie from backend and navigate to join
            color='purple.300'
            sx={{
              position: 'absolute',
              top: '25%',
              bottom: '25%',
              right: '5%'
            }}
          />
        </Box>
        <Button
          mt='5'
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
