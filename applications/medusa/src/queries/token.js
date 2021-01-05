import { graphql } from 'react-relay/hooks';

export const TokenQuery = graphql`
  query tokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      registered
      sameSession
    }
  }
`;

export const StateQuery = graphql`
  query tokenStateQuery {
    state {
      user {
        username
      }
      tokenData {
        redeemed
        registered
      }
    }
  }
`;
