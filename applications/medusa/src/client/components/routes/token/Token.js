import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../../register/Register';
import { Frame } from '@//:modules/content';
import { Heading, Text } from '@//:modules/typography';
import { useTranslation } from 'react-i18next';

const TokenQuery = graphql`
  query TokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
      session
    }
  }
`;

export default function Root({ prepared }) {
  const data = usePreloadedQuery(TokenQuery, prepared.tokenQuery);
  const [t] = useTranslation('auth');

  if (data.redeemCookie === null) {
    return t('expired');
  }

  const { sameSession, registered, session } = data.redeemCookie;

  // Token was not redeemed in the same session, so we tell the user to check
  // the other session
  if (!sameSession) {
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
            {JSON.parse(session)['user-agent']}
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

  if (!registered) {
    return <Register />;
  }

  // User is registered - should be redirected or something
  return null;
}
