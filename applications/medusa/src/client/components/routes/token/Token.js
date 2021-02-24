// @flow
import * as React from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../../register/Register';
import { Frame } from '@//:modules/content';
import { Heading, Text } from '@//:modules/typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from '@//:modules/routing';
import type { TokenQuery } from './__generated__/TokenQuery.graphql';
import type { PreloadedQuery } from 'react-relay/relay-experimental';

type Props = {
  prepared: {
    tokenQuery: PreloadedQuery<TokenQuery>,
  },
};

const TokenQueryGQL = graphql`
  query TokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
      session
    }
  }
`;

export default function Token(props: Props): ?React.Element<typeof Register> {
  const data = usePreloadedQuery<TokenQuery>(
    TokenQueryGQL,
    props.prepared.tokenQuery,
  );

  const [t] = useTranslation('auth');
  const history = useHistory();

  if (data.redeemCookie === null) {
    return t('expired');
  }

  // Token was not redeemed in the same session, so we tell the user to check
  // the other session
  if (!data.redeemCookie?.sameSession) {
    return (
      <Frame>
        <Heading sx={{ textAlign: 'center', fontSize: 2 }}>
          {t('header')}
        </Heading>
        <div
          sx={{
            mt: 4,
            width: 'fill',
            textAlign: 'center',
            backgroundColor: 'neutral.800',
            pt: 2,
            pb: 2,
          }}
        >
          <Text sx={{ color: 'green.300' }}>
            {JSON.parse(data.redeemCookie?.session || '')['user-agent']}
          </Text>
        </div>
        <div
          sx={{
            mt: 4,
            width: 'fill',
            textAlign: 'center',
          }}
        >
          <Text>{t('close')}</Text>
        </div>
      </Frame>
    );
  }

  if (!data.redeemCookie?.registered) {
    return <Register />;
  }

  // User is registered - redirect to profile
  history.push('/profile');
  return null;
}
