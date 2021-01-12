import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../join/components/Register';

const TokenQuery = graphql`
  query TokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
    }
  }
`;

export default function Token({ prepared }) {
  const result = usePreloadedQuery(TokenQuery, prepared.tokenQuery);

  const { sameSession, registered } = result.redeemCookie;

  if (sameSession) {
    return 'check the other session';
  }

  if (registered) {
    return 'redirect, registered';
  }

  return <Register />;
}
