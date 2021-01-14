import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../../register/Register';
import { useHistory } from '@//:modules/routing';

const TokenQuery = graphql`
  query TokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
      session
    }
  }
`;

export default function Token({ prepared }) {
  const result = usePreloadedQuery(TokenQuery, prepared.tokenQuery);
  const history = useHistory();

  if (result.redeemCookie === null) {
    return 'token expired or invalid';
  }

  const { sameSession, registered, session } = result.redeemCookie;

  if (!sameSession) {
    return session;
  }

  if (registered) {
    history.replace('/profile');
    return null;
  }

  return <Register />;
}
