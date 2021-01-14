import { graphql, useSubscription, useMutation } from 'react-relay/hooks';
import { useMemo } from 'react';
import { Heading, Text } from '@//:modules/typography';
import { Button } from '@//:modules/form';

const LobbySubscription = graphql`
  subscription LobbySubscription {
    authListener {
      sameSession
      cookie {
        registered
      }
    }
  }
`;

const LobbyEmail = graphql`
  mutation LobbyMutation {
    authEmail
  }
`;

export default function Lobby({ onReceive, email }) {
  // Received a subscription response
  const onNext = response => {
    const { sameSession, cookie } = response.authListener;

    // If the cookie was redeemed in the same browser session, or the user is registered, refresh the page
    if (sameSession || cookie.registered) {
      window.location.reload();
    } else {
      onReceive(response);
    }
  };

  const config = useMemo(
    () => ({
      variables: {},
      subscription: LobbySubscription,
      onNext,
    }),
    [],
  );

  useSubscription(config);

  const [sendEmail, isSendingEmail] = useMutation(LobbyEmail);

  const onSubmit = () => {
    sendEmail({
      variables: {},
      onCompleted(data) {},
      onError(data) {},
    });
  };

  return (
    <>
      <Heading>Click on the link you received in the email to continue</Heading>
      <div>
        <Text>{email}</Text>
      </div>
      <Button disabled={isSendingEmail} onClick={onSubmit}>
        Re-send email
      </Button>
    </>
  );
}
