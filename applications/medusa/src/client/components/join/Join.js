import { graphql, useMutation, useRelayEnvironment } from 'react-relay/hooks';
import { requestSubscription } from 'react-relay';
import { useState, useRef } from 'react';
import Register from './components/Register';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@//:modules/form';
import { useNotify } from '@//:modules/focus';

const joinAction = graphql`
  mutation JoinMutation($data: AuthenticationInput!) {
    authenticate(data: $data)
  }
`;

const subscription = graphql`
  subscription JoinSubscription {
    authListener {
      authorized
      redirect
      cookie {
        sameSession
      }
    }
  }
`;

export default function Join({ props }) {
  const [t] = useTranslation('auth');

  const [commit, isInFlight] = useMutation(joinAction);

  const notify = useNotify();

  const disposableRef = useRef(null);

  const relayEnvironment = useRelayEnvironment();

  const [sub, setSub] = useState(null);

  const [waiting, setWaiting] = useState(false);

  const changeSub = data => {
    setSub(data);
    setWaiting(false);
    disposableRef.current.dispose();
  };

  const config = {
    variables: {},
    subscription,
    onNext: response => changeSub(response),
    // onCompleted: res => disposableRef.current.dispose(),
  };

  const [email, setEmail] = useState('');

  const onChange = event => {
    setEmail(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    commit({
      variables: {
        data: {
          email: email,
        },
      },
      onCompleted(data) {
        setWaiting(true);
        disposableRef.current = requestSubscription(relayEnvironment, config);
      },
      onError(data) {
        notify.error('testasdasdasd');
      },
    });
  };

  if (waiting) {
    return 'waiting';
  }

  if (sub !== null) {
    if (sub.authenticationState) {
      if (!sub.authenticationState.authorized) {
        return 'not authorized';
      }

      if (sub.authenticationState.redirect) {
        return 'check opened browser window, or refresh page';
      }

      if (sub.authenticationState.registered) {
        return 'redirect';
      } else {
        return <Register {...props} />;
      }
    }

    return 'waiting';
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          sx={{ variant: 'forms.input.primary' }}
          disabled={isInFlight}
          required
          type="text"
          value={email}
          onChange={onChange}
          placeholder={t('authenticate.input')}
        />
        <Button
          disabled={isInFlight}
          sx={{ width: '100%', variant: 'primary', mt: 2 }}
        >
          {t('authenticate.continue')}
        </Button>
      </form>
    </>
  );
}
