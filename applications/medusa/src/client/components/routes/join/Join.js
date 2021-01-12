import { graphql, useMutation } from 'react-relay/hooks';
import { useState } from 'react';
import Register from '../../register/Register';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@//:modules/form';
import { useNotify } from '@//:modules/focus';
import Lobby from './components/Lobby';

const JoinAction = graphql`
  mutation JoinMutation($data: AuthenticationInput!) {
    authenticate(data: $data)
  }
`;

export default function Join(props) {
  const [t] = useTranslation('auth');

  const [commit, isInFlight] = useMutation(JoinAction);

  const [email, setEmail] = useState('');

  const notify = useNotify();

  const [authInfo, setAuthInfo] = useState(null);

  const [waiting, setWaiting] = useState(false);

  const changeAuth = data => {
    setAuthInfo(data);
    setWaiting(false);
  };

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
      },
      onError(data) {
        notify.error('testasdasdasd');
      },
    });
  };

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (waiting) {
    return <Lobby email={email} onReceive={changeAuth} />;
  }

  // We have received a subscription update - we want to handle the logic here based
  // on the response we get
  if (authInfo !== null) {
    const { sameSession, cookie } = authInfo.authListener;

    // Cookie was redeemed in the same session,
    if (sameSession) {
      return 'check opened browser window, or refresh page';
    }

    // Cookie was not redeemed in the same session, and user is registered
    if (cookie.registered) {
      return 'redirect';
    }

    // User not registered - prompt a registration
    return <Register />;
  }

  return (
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
  );
}
