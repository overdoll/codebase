/**
 * @flow
 */
import { graphql, useMutation, useSubscription } from 'react-relay/hooks'
import type { Node } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { LobbySubscriptionResponse } from '@//:artifacts/LobbySubscription.graphql'
import Icon from '@//:modules/content/icon/Icon'
import SignBadgeCircle from '@streamlinehq/streamlinehq/img/streamline-regular/sign-badge-circle-K1i3HA.svg'
import { Box, Center, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/button'
import { useClickDelay } from '@//:modules/utilities/hooks'

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
  const [t] = useTranslation('auth')

  const [sendEmail, isSendingEmail] = useMutation(LobbyEmail)

  const [isTimedOut, currentTimer, createTimeout] = useClickDelay('lobbyButton')

  // TODO fix submitting as it doesn't work (no success message)

  const onSubmit = () => {
    createTimeout(60000)
    sendEmail({
      variables: {},
      onCompleted (data) {
        notify({
          status: 'success',
          title: t('lobby.verification'),
          isClosable: true
        })
      },
      onError (data) {}
    })
  }

  return (
    <Center mt={40}>
      <Flex w={['sm', 'md']} direction='column' align='center'>
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
        <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800' w='100%'>
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
          disabled={isTimedOut}
        >
          {t('lobby.resend') + (isTimedOut ? ` (${currentTimer / 1000})` : '')}
        </Button>
      </Flex>
    </Center>
  )
}
