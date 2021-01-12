import { graphql, useSubscription } from 'react-relay/hooks';
import { useMemo } from 'react';
import { Heading, Text } from '@//:modules/typography';

const subscription = graphql`
  subscription LobbySubscription {
    authListener {
      sameSession
      cookie {
        registered
      }
    }
  }
`;

export default function Lobby({ onReceive, email }) {
  const config = useMemo(
    () => ({
      variables: {},
      subscription,
      onNext: response => onReceive(response),
    }),
    [],
  );

  useSubscription(config);

  return (
    <>
      <Heading>Click on the link you received in the email to continue</Heading>
      <div>
        <Text>{email}</Text>
      </div>
    </>
  );
}
