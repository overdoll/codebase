/**
 * @flow
 */
import type { Node } from 'react';
import type { PreloadedQueryInner } from 'react-relay/hooks';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../../register/Register';
import { useTranslation } from 'react-i18next';
import { useHistory } from '@//:modules/routing';
import type { TokenQuery } from '@//:artifacts/TokenQuery.graphql';
import { Center, chakra, Flex, Heading, Text } from '@chakra-ui/react';

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
`;

export default function Token(props: Props): Node {
  const data = usePreloadedQuery<TokenQuery>(
    TokenQueryGQL,
    props.prepared.tokenQuery,
  );

  const [t] = useTranslation('token');
  const history = useHistory();

  if (data.redeemCookie.invalid) {
    // Go back to Join page and send notification of invalid token
    history.push('/join?notify=invalid_token');
    return 'invalid';
  }

  // Token was not redeemed in the same session, so we tell the user to check
  // the other session
  if (!data.redeemCookie.sameSession) {
    return (
      <Center mt={8}>
        <Flex w={['fill', 400]} direction="column">
          <Heading sx={{ textAlign: 'center', fontSize: 2 }}>
            {t('header')}
          </Heading>
          <chakra.div
            sx={{
              mt: 4,
              width: 'fill',
              textAlign: 'center',
              backgroundColor: 'grey.800',
              pt: 2,
              pb: 2,
            }}
          >
            <Text color="green.300">
              {JSON.parse(data.redeemCookie.session)['user-agent']}
            </Text>
          </chakra.div>
          <chakra.div
            sx={{
              mt: 4,
              width: 'fill',
              textAlign: 'center',
            }}
          >
            <Text>{t('close')}</Text>
          </chakra.div>
        </Flex>
      </Center>
    );
  }

  if (!!data.redeemCookie.registered === false) {
    return <Register />;
  }

  // User is registered - redirect to profile
  history.push('/profile');
  return 'redirecting';
}
