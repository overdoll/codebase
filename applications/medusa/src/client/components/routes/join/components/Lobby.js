import { graphql, useSubscription, useMutation } from 'react-relay/hooks';
import { useMemo } from 'react';
import { Heading, Text } from '@//:modules/typography';
import { Button } from '@//:modules/form';
import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';

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
  const notify = useNotify();

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

  const onError = () => {
    notify.error(
      'There was an error with this page. Please refresh when you click on your confirmation email',
    );
  };

  const config = useMemo(
    () => ({
      variables: {},
      subscription: LobbySubscription,
      onNext,
      onError,
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
    <Frame>
      <Heading sx={{ textAlign: 'center', fontSize: 2 }}>
        Click on the link you received in the email to continue
      </Heading>
      <div
        sx={{
          mt: 4,
          width: 'fill',
          textAlign: 'center',
          backgroundColor: 'neutral.800',
          pt: 2,
          pb: 2,
        }}
      >
        <Text sx={{ color: 'purple.300' }}>{email}</Text>
      </div>
      <Button
        sx={{ mt: 2, variant: 'buttons.secondary', width: 'fill' }}
        disabled={isSendingEmail}
        onClick={onSubmit}
      >
        Resend email
      </Button>
    </Frame>
  );
}
