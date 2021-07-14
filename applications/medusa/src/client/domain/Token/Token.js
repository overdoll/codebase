/**
 * @flow
 */
import type { Node } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import Register from '../Register/Register'
import { useTranslation } from 'react-i18next'
import { useHistory } from '@//:modules/routing'
import type { TokenQuery } from '@//:artifacts/TokenQuery.graphql'
import { Icon } from '@//:modules/content'
import UAParser from 'ua-parser-js'
import { Alert, AlertDescription, AlertIcon, Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useFlash } from '@//:modules/flash'
import { Helmet } from 'react-helmet-async'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'

type Props = {
  prepared: {
    tokenQuery: PreloadedQueryInner<TokenQuery>,
  },
};

const TokenQueryGQL = graphql`
  query TokenQuery($token: String!) {
    redeemAuthenticationToken(token: $token) {
      redeemed
      email
      session
      sameSession
      accountStatus {
        registered
        authenticated
        multiFactor
      }
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

  const notify = useToast()

  const { flash } = useFlash()

  if (!data.redeemAuthenticationToken) {
    // Go back to Join page and send notification of invalid token
    flash('login.notify', t('invalid_token'))
    history.push('/join')
    return null
  }

  // Token was not redeemed in the same session, so we tell the user to check
  // the other session
  if (!data.redeemAuthenticationToken.sameSession) {
    const cookieText = UAParser(
      JSON.parse(data.redeemAuthenticationToken.session)['user-agent']
    )

    return (
      <>
        <Helmet title='complete' />
        <Center mt={8}>
          <Flex w={['fill', 'sm']} direction='column'>
            <Icon
              icon={SignBadgeCircle}
              w={100}
              h={100}
              color='green.500'
              ml='auto'
              mr='auto'
              mb={8}
            />
            <Heading mb={8} align='center' size='md' color='gray.100'>
              {t('header')}
            </Heading>
            <Box mb={8} pt={3} pb={3} borderRadius={5} bg='gray.800'>
              <Center>
                <Text fontSize='lg' color='green.300'>
                  {cookieText.browser.name} {cookieText.browser.major},{' '}
                  {cookieText.os.name} {cookieText.os.version}
                </Text>
              </Center>
            </Box>
            <Alert mt={4} borderRadius={5}>
              <AlertIcon />
              {t('close')}
              <AlertDescription />
            </Alert>
          </Flex>
        </Center>
      </>
    )
  }

  if (data.redeemAuthenticationToken.accountStatus && !data.redeemAuthenticationToken.accountStatus.registered) {
    return <Register />
  }

  // User is registered - redirect to profile
  if (data.redeemAuthenticationToken.accountStatus && data.redeemAuthenticationToken.accountStatus.authenticated) {
    history.push('/profile')
    return null
  }

  return null
}
