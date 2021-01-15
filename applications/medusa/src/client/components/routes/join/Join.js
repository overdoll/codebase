import { graphql, useMutation, useFragment } from 'react-relay/hooks';
import { useState, useContext } from 'react';
import Register from '../../register/Register';
import { useTranslation } from 'react-i18next';
import { Button, Input, useForm } from '@//:modules/form';
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
      email
    }
  }
`;

export default function Join() {
  const rootQuery = useContext(RootContext);
  const data = useFragment(RootFragment, rootQuery.authentication);

  const [t] = useTranslation('auth');

  const [commit, isInFlight] = useMutation(JoinAction);
  const { register, handleSubmit } = useForm();

  const notify = useNotify();

  // Receiving a subscription response
  const [authInfo, setAuthInfo] = useState({ authListener: null });

  // Waiting for a subscription
  const [waiting, setWaiting] = useState(false);

  const [email, setEmail] = useState(null);

  const changeAuth = data => {
    setAuthInfo(data);
    setWaiting(false);
  };

  const onSubmit = val => {
    setEmail(val.email);
    commit({
      variables: {
        data: {
          email: val.email,
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
  const emptyAuthCookie = data.cookie === null;

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (
    waiting ||
    (emptySubscriptionResponse && !emptyAuthCookie && !data.cookie.redeemed)
  ) {
    return (
      <Lobby
        // Use auth cookie's email as backup, since it may not be here after a refresh
        email={!emptyAuthCookie ? data.cookie.email : email}
        onReceive={changeAuth}
      />
    );
  }

  // User not registered - when we either receive this response from a subscription, or a page refresh
  const subscriptionNotRegistered =
    !emptySubscriptionResponse &&
    authInfo.authListener.cookie.registered === false;

  // Cookie was redeemed, but the user is not registered
  const cookieRedeemedNotRegistered =
    !emptyAuthCookie && data.cookie.redeemed && !data.cookie.registered;

  // We already have auth cookie data, and it's been redeemed. We want the user to register
  if (subscriptionNotRegistered || cookieRedeemedNotRegistered) {
    return <Register />;
  }

  // Ask user to authenticate
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        sx={{ variant: 'forms.input.primary' }}
        disabled={isInFlight}
        register={register}
        validation={{ required: true }}
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
