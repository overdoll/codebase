/**
 * @flow
 */
import type { Node } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import Register from '../../register/Register'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'
import type { TokenQuery } from '@//:artifacts/TokenQuery.graphql'
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useFlash } from '@//:modules/flash'

type Props = {
  prepared: {
    tokenQuery: PreloadedQueryInner<TokenQuery>,
  },
};

const TokenQueryGQL = graphql`
  query TokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
      session
      invalid
    }
  }
`

export default function Token (props: Props): Node {
  const data = usePreloadedQuery<TokenQuery>(
    TokenQueryGQL,
    props.prepared.tokenQuery
  )

  const [t] = useTranslation('token')
  const history = useHistory()

  const [, push] = useFlash()

  if (data.redeemCookie.invalid) {
    // Go back to Join page and send notification of invalid token
    push('login.notify', 'invalid_token')
    history.push('/join')
    return null
  }

  // Token was not redeemed in the same session, so we tell the user to check
  // the other session
  if (!data.redeemCookie.sameSession) {
    return (
      <Center mt={8}>
        <Flex w={['fill', 'sm']} direction='column'>
          <Heading size='lg' align='center'>
            {t('header')}
          </Heading>
          <Box mt='4' p='2' backgroundColor='gray.700'>
            <Text color='green.300' fontWeight='bold' align='center'>
              {JSON.parse(data.redeemCookie.session)['user-agent']}
            </Text>
          </Box>
          <Box mt='3' align='center'>
            <Text>{t('close')}</Text>
          </Box>
        </Flex>
      </Center>
    )
  }

  if (!!data.redeemCookie.registered === false) {
    return <Register />
  }

  // User is registered - redirect to profile
  history.push('/profile')
  return null
}
