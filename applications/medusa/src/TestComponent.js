import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

export default function TestComponent({ props }) {
  const data = useLazyLoadQuery(
    graphql`
      query TestComponentQuery($cookie: String!) {
        authenticationCookie(cookie: $cookie) {
          cookie
          email
          redeemed
          expiration
        }
      }
    `,
    { cookie: 'test' },
  );

  console.log(data);

  return <div>hello</div>;
}
