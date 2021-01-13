import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../../register/Register';

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

  if (result.redeemCookie === null) {
    return 'token expired or invalid';
  }

  const { sameSession, registered, session } = result.redeemCookie;

  if (!sameSession) {
    return session;
  }

  if (registered) {
    return 'redirect, registered';
  }

  return <Register />;
}
