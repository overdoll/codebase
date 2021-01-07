import { graphql } from 'react-relay/hooks';

export const TokenQuery = graphql`
  query tokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      sameSession
      registered
      redeemed
    }
  }
`;

export const StateQuery = graphql`
  query tokenStateQuery {
    authentication {
      user {
        username
      }
      cookie {
        redeemed
        registered
        sameSession
      }
    }
  }
`;
