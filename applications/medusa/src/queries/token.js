import { graphql } from 'react-relay/hooks';

export const TokenQuery = graphql`
  query tokenQuery($cookie: String!) {
    redeemCookie(cookie: $cookie) {
      registered
      sameSession
    }
  }
`;
