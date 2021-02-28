/**
 * @flow
 */
import { graphql, useSubscription, useMutation } from 'react-relay/hooks';
import type { Node } from 'react';
import { useMemo } from 'react';
import { useMemo, useState } from 'react';
import { Heading, Text } from '@//:modules/typography';
import { Button } from '@//:modules/form';
import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';
import { useTranslation } from 'react-i18next';
import type { LobbySubscriptionResponse } from '@//:artifacts/LobbySubscription.graphql';
import Icon from '@//:modules/content/icon/Icon';
import { SignShapes } from '@streamlinehq/streamline-regular/lib/maps-navigation';

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

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [timer, setTimer] = useState(0);

  const onSubmit = () => {
    sendEmail({
      variables: {},
      onCompleted(data) {
        notify.success(t('lobby.verification'));
        timeOut(60000);
      },
      onError(data) {},
    });
  };

  const timeOut = timeOutLength => {
    setButtonDisabled(true);
    setTimer(timeOutLength / 1000);
    const interval = setInterval(() => {
      setTimer(x => x - 1);
    }, 1000);
    setTimeout(() => {
      clearTimeout(interval);
    }, timeOutLength);
  };

  const clearTimeout = interval => {
    setButtonDisabled(false);
    clearInterval(interval);
  };

  return (
    <Frame>
      <Icon
        icon={SignShapes.SignBadgeCircle}
        strokeWidth={2.5}
        stroke={'purple.300'}
        size={80}
        sx={{
          display: 'block',
          pb: 7,
          pt: 6,
          textAlign: 'center',
        }}
      />
      <Heading sx={{ textAlign: 'center', fontSize: 3 }}>
        {t('lobby.header')}
      </Heading>
      <div
        sx={{
          mt: 6,
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'neutral.800',
          pt: 3,
          pb: 3,
        }}
      >
        <Text sx={{ color: 'purple.300', fontSize: 2 }}>{email}</Text>
        <Icon
          icon={SignShapes.SignBadgeCircle}
          strokeWidth={2}
          stroke={'purple.300'}
          size={16}
          sx={{
            right: 0,
            position: 'absolute',
            display: 'block',
          }}
        />
      </div>
      <Button
        sx={{ mt: 6, variant: 'buttons.secondary', width: 'fill' }}
        loading={isSendingEmail}
        onClick={onSubmit}
        disabled={buttonDisabled}
      >
        {t('lobby.resend') +
          (buttonDisabled === false ? '' : ' ' + '(' + timer + ')')}
      </Button>
    </Frame>
  );
}
