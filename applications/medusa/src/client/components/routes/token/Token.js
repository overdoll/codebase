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

export default function Root({ prepared }) {
  const data = usePreloadedQuery(TokenQuery, prepared.tokenQuery);

  const history = useHistory();

  if (data.redeemCookie === null) {
    return 'token expired or invalid';
  }

  const { sameSession, registered, session } = data.redeemCookie;

  if (!sameSession) {
    return session;
  }

  if (registered) {
    history.replace('/profile');
    return null;
  }

  return <Register />;
}
