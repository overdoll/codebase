import { graphql, useMutation, useFragment } from 'react-relay/hooks';
import { useState, useContext } from 'react';
import Register from '../../register/Register';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@//:modules/form';
import { useNotify } from '@//:modules/focus';
import Lobby from './components/Lobby';
import { RootContext } from '../Root';

const JoinAction = graphql`
  mutation JoinMutation($data: AuthenticationInput!) {
    authenticate(data: $data)
  }
`;

const RootFragment = graphql`
  fragment JoinFragment on Authentication {
    cookie {
      redeemed
      registered
      sameSession
      email
    }
  }
`;

export default function Join(props) {
  const [t] = useTranslation('auth');

  const [commit, isInFlight] = useMutation(JoinAction);

  // Use cookie data for this route to determine what action to perform
  const rootQuery = useContext(RootContext);
  const currentData = useFragment(RootFragment, rootQuery.authentication);

  const [email, setEmail] = useState('');

  const notify = useNotify();

  const [authInfo, setAuthInfo] = useState({ authListener: null });

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
        notify.error('error with joining!');
      },
    });
  };

  // Checks for various types of states
  const emptySubscriptionResponse = authInfo.authListener === null;
  const emptyAuthCookie = currentData.cookie === null;

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (
    waiting ||
    (emptySubscriptionResponse &&
      !emptyAuthCookie &&
      !currentData.cookie.redeemed)
  ) {
    return (
      <Lobby
        // Use auth cookie's email as backup, since it may not be here after a refresh
        email={!emptyAuthCookie ? currentData.cookie.email : email}
        onReceive={changeAuth}
      />
    );
  }

  // We already have auth cookie data, and it's been redeemed. We want the user to register
  if (
    !emptyAuthCookie &&
    currentData.cookie.redeemed &&
    !currentData.cookie.registered
  ) {
    return <Register />;
  }

  // We have received a subscription update - we want to handle the logic here based
  // on the response we get
  if (!emptySubscriptionResponse) {
    const { sameSession, cookie } = authInfo.authListener;

    // Cookie was redeemed in the same session,
    if (sameSession) {
      return 'check opened browser window, or refresh page';
    }

    // Cookie was not redeemed in the same session, and user is registered - refresh to generate a session token
    if (cookie.registered) {
      window.location.reload();
      return 'refreshing';
    }

    // User not registered - prompt a registration
    return <Register />;
  }

  // Ask user to authenticate
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
