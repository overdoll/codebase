/**
 * @flow
 */
import { graphql, useMutation } from 'react-relay/hooks'
import type { Node } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { Box, Center, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/button'
import { useClickDelay } from '@//:modules/utilities/hooks'

import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'

type Props = {
  refresh: () => void,
  email: ?string,
};

const LobbyEmail = graphql`
  mutation LobbyMutation {
    reissueAuthenticationToken {
     authenticationToken {
        email
     }
    }
  }
`

export default function Lobby (props: Props): Node {
  const notify = useToast()

  const [t] = useTranslation('auth')

  const [sendEmail, isSendingEmail] = useMutation(LobbyEmail)

  const [isTimedOut, currentTimer, createTimeout] = useClickDelay('lobbyButton')

  // poll for result
  useEffect(() => {
    function refresh () {
      props.refresh()
      setTimeout(refresh, 2000)
    }
    setTimeout(refresh, 2000)
  }, [])

  const onSubmit = () => {
    sendEmail({
      variables: {},
      onCompleted () {
        createTimeout(60000)
        notify({
          status: 'success',
          title: t('lobby.verification'),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('lobby.verification_error'),
          isClosable: true
        })
      }
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
        <Heading mb={8} align='center' size='md' color='gray.00'>
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
