import { graphql, useFragment } from 'react-relay/hooks'
import { useEffect, useMemo } from 'react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import type { LobbyFragment$key } from '@//:artifacts/LobbyFragment.graphql'
import { useCookies } from 'react-cookie'
import { Trans } from '@lingui/macro'
import RevokeTokenButton from '../../components/RevokeTokenButton/RevokeTokenButton'
import Head from 'next/head'
import { MailEnvelope } from '@//:assets/icons'

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

let timeout = null

export default function Lobby ({
  queryRef,
  refresh
}: Props): JSX.Element {
  const data = useFragment(LobbyFragment, queryRef)

  const [cookies] = useCookies<string>(['token'])

  // in case email isn't available, we get our fallback (read from cookie)
  // TODO causes a router mismatch error
  const email = useMemo(() => {
    const emailCookie = cookies.token

    if (emailCookie != null) {
      return emailCookie.split(';')[1]
    }

    return ''
  }, [cookies])

  // poll for result
  // TODO figure out a way to stub it since it will keep running even if its on another route
  // TODO needs a return to clear it
  useEffect(() => {
    const refreshLoop = (): void => {
      console.log('refreshing from lobby')
      refresh()
      timeout = setTimeout(refreshLoop, 2000)
    }

    timeout = setTimeout(refreshLoop, 2000)

    return () => {
      if (timeout != null) {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Waiting for authentication... :: overdoll</title>
      </Head>
      <Flex align='center' h='100%' position='relative'>
        <Flex top={0} position='absolute' w='100%' justify='flex-end'>
          <RevokeTokenButton queryRef={data} />
        </Flex>
        <Stack spacing={6}>
          <Icon
            icon={MailEnvelope}
            w={16}
            h={16}
            fill='purple.400'
          />
          <Box>
            <Heading
              textAlign='center'
              fontSize='xl'
              color='gray.00'
              mb={1}
            >
              <Trans>
                Tap on the link you received in your email inbox to continue
              </Trans>
            </Heading>
            <Heading textAlign='center' color='gray.300' fontSize='sm'>
              <Trans>
                Make sure to check your spam!
              </Trans>
            </Heading>
          </Box>
          <Flex
            justify='center'
            align='center'
            wordBreak='break-all'
            p={3}
            borderRadius='md'
            bg='gray.900'
            w='100%'
          >
            <Heading
              textAlign='center'
              fontSize='md'
              color='purple.300'
            >
              {data.email}
            </Heading>
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}
