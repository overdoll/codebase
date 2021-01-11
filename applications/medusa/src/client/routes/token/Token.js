import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import Register from '../join/components/Register';

const TokenQuery = graphql`
  query TokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
      redeemed
    }
  }
`;

export default function Token({ prepared }) {
  const result = usePreloadedQuery(TokenQuery, prepared.tokenQuery);

  if (result.redeemCookie) {
    if (!result.redeemCookie.sameSession) {
      return 'other session';
    }

    if (!result.redeemCookie.registered) {
      return <Register />;
    }

    return 'redirect';
  }

  return null;
}
