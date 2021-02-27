import { graphql, useSubscription, useMutation } from 'react-relay/hooks';
import { useMemo, useState } from 'react';
import { Heading, Text } from '@//:modules/typography';
import { Button } from '@//:modules/form';
import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';
import { useTranslation } from 'react-i18next';
import Icon from '@//:modules/content/icon/Icon';
import { SignShapes } from '@streamlinehq/streamline-regular/lib/maps-navigation';

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
  const [t] = useTranslation('auth');

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
    notify.error(t('lobby.error'));
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
