import { graphql, useFragment } from 'react-relay/hooks'
import { useEffect, useMemo } from 'react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import { BadgeCircle } from '@//:assets/icons/navigation'
import type { LobbyFragment$key } from '@//:artifacts/LobbyFragment.graphql'
import { useCookies } from 'react-cookie'
import { Trans } from '@lingui/macro'
import RevokeTokenButton from '../../components/RevokeTokenButton/RevokeTokenButton'
import Head from 'next/head'

interface Props {
  refresh: () => void
  queryRef: LobbyFragment$key
}

const LobbyFragment = graphql`
  fragment LobbyFragment on AuthenticationToken {
    email
    ...RevokeTokenButtonFragment
  }
`

export default function Lobby ({
  queryRef,
  refresh
}: Props): JSX.Element {
  const data = useFragment(LobbyFragment, queryRef)

  const [cookies] = useCookies<string>(['token'])

  // in case email isn't available, we get our fallback (read from cookie)
  const email = useMemo(() => {
    const emailCookie = cookies.token

    if (emailCookie != null) {
      return emailCookie.split(';')[1]
    }

    return ''
  }, [cookies])

  // poll for result
  useEffect(() => {
    const refreshLoop = (): void => {
      refresh()
      setTimeout(refreshLoop, 2000)
    }

    setTimeout(refreshLoop, 2000)
  }, [])

  return (
    <>
      <Head>
        <title>Waiting For Authentication :: overdoll</title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Icon
            icon={BadgeCircle}
            w={100}
            h={100}
            fill='purple.300'
            ml='auto'
            mr='auto'
          />
          <Heading
            textAlign='center'
            size='md'
            color='gray.00'
          >
            <Trans>
              Tap on the link you received in your email inbox to continue
            </Trans>
          </Heading>
          <Flex
            justify='center'
            wordBreak='break-all'
            pt={3}
            pb={3}
            pr={2}
            borderRadius={5}
            bg='gray.800'
            w='100%'
          >
            <Text
              fontSize='lg'
              color='purple.300'
            >
              {email ?? data.email}
            </Text>
          </Flex>
          <Flex w='100%' justify='center'>
            <RevokeTokenButton queryRef={data} />
          </Flex>
        </Stack>
      </PageWrapper>
    </>
  )
}
