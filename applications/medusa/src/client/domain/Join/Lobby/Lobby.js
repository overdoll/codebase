/**
 * @flow
 */
import { graphql, useFragment } from 'react-relay/hooks'
import type { Node } from 'react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { PageWrapper } from '../../../components/PageLayout'

import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import type { LobbyFragment$key } from '@//:artifacts/LobbyFragment.graphql'
import { useCookies } from 'react-cookie'

type Props = {
  refresh: () => void,
  queryRef: LobbyFragment$key,
};

const LobbyFragment = graphql`
  fragment LobbyFragment on AuthenticationToken {
    id
    email
  }
`

export default function Lobby ({
  queryRef,
  refresh
}: Props): Node {
  const data = useFragment(LobbyFragment, queryRef)

  const [cookies] = useCookies(['token'])

  // in case email isn't available, we get our fallback (read from cookie)
  const email = useMemo(() => {
    const emailCookie = cookies.token

    if (emailCookie) {
      return emailCookie.split(';')[1]
    }

    return ''
  }, [cookies])

  const [t] = useTranslation('auth')

  // poll for result
  useEffect(() => {
    const refreshLoop = () => {
      refresh()
      setTimeout(refreshLoop, 2000)
    }

    setTimeout(refreshLoop, 2000)
  }, [])

  return (
    <PageWrapper>
      <Icon
        icon={BadgeCircle}
        w={100}
        h={100}
        fill='purple.300'
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
          {email || data.email}
        </Text>
      </Flex>
    </PageWrapper>
  )
}
