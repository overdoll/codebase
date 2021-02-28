/**
 * @flow
 */
import { graphql, useSubscription, useMutation } from 'react-relay/hooks';
import type { Node } from 'react';
import { useMemo } from 'react';
import { Heading, Text } from '@//:modules/typography';
import { Button } from '@//:modules/form';
import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';
import { useTranslation } from 'react-i18next';
import type { LobbySubscriptionResponse } from '@//:artifacts/LobbySubscription.graphql';

type Props = {
  onReceive: any,
  email: ?string,
};

const LobbySubscriptionGQL = graphql`
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

export default function Lobby(props: Props): Node {
  const notify = useNotify();
  const [t] = useTranslation('auth');

  useSubscription<LobbySubscriptionResponse>(
    useMemo(
      () => ({
        variables: {},
        subscription: LobbySubscriptionGQL,

        // Received a subscription response
        onNext: (response: ?LobbySubscriptionResponse) => {
          // If the cookie was redeemed in the same browser session, or the user is registered, refresh the page
          if (
            response?.authListener?.sameSession ||
            response?.authListener?.cookie?.registered
          ) {
            window.location.reload();
          } else {
            props.onReceive(response);
          }
        },

        // Subscription error - show to user
        onError: () => {
          notify.error(t('lobby.error'));
        },
      }),
      [],
    ),
  );

  const [sendEmail, isSendingEmail] = useMutation(LobbyEmail);

  const onSubmit = () => {
    sendEmail({
      variables: {},
      onCompleted(data) {
        notify.success(t('lobby.verification'));
      },
      onError(data) {},
    });
  };

  return (
    <Frame>
      <Heading sx={{ textAlign: 'center', fontSize: 2 }}>
        {t('lobby.header')}
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
        <Text sx={{ color: 'purple.300' }}>{props.email}</Text>
      </div>
      <Button
        sx={{ mt: 2, variant: 'buttons.secondary', width: 'fill' }}
        loading={isSendingEmail}
        onClick={onSubmit}
      >
        {t('lobby.resend')}
      </Button>
    </Frame>
  );
}
