/**
 * @flow
 */
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { Node } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { Box, Center, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useClickDelay } from '@//:modules/utilities/hooks'

import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import type { LobbyFragment$key } from '@//:artifacts/LobbyFragment.graphql'

type Props = {
  refresh: () => void,
  queryRef: LobbyFragment$key,
};

const LobbyEmail = graphql`
  mutation LobbyMutation {
    reissueAuthenticationToken {
      validation
      authenticationToken {
        email
      }
    }
  }
`

const LobbyFragment = graphql`
  fragment LobbyFragment on AuthenticationToken {
    email
  }
`

export default function Lobby ({ queryRef, refresh }: Props): Node {
  const data = useFragment(LobbyFragment, queryRef)

  const [commit, isInFlight] = useMutation(LobbyEmail)

  const notify = useToast()

  const [t] = useTranslation('auth')

  const [isTimedOut, currentTimer, createTimeout] = useClickDelay('lobbyButton')

  // poll for result
  useEffect(() => {
    const refreshLoop = () => {
      refresh()
      setTimeout(refreshLoop, 2000)
    }

    setTimeout(refreshLoop, 2000)
  }, [])

  const onSubmit = () => {
    commit({
      variables: {},
      onCompleted (payload) {
        if (payload.reissueAuthenticationToken.validation) {
          notify({
            status: 'error',
            title: payload.reissueAuthenticationToken.validation,
            isClosable: true
          })
          return
        }

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
      <Flex w={['sm', 'md']} ml={[1, 0]} mr={[1, 0]} direction='column' align='center'>
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
        <Flex
          justify='center' wordBreak='break-all' mb={8} pt={3} pb={3} pr={2} borderRadius={5}
          bg='gray.800'
          w='100%'
        >
          <Text fontSize='lg' color='purple.300'>
            {data.email}
          </Text>
        </Flex>
        <Button
          size='lg'
          loading={isInFlight}
          onClick={onSubmit}
          disabled={isTimedOut}
        >
          {t('lobby.resend') + (isTimedOut ? ` (${currentTimer / 1000})` : '')}
        </Button>
      </Flex>
    </Center>
  )
}
