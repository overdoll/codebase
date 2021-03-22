/**
 * @flow
 */
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import type { Node } from 'react';
import { useContext, useState, useEffect } from 'react';
import Register from '../../register/Register';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, useForm } from '@//:modules/form';
import { Frame } from '@//:modules/content';
import { useNotify } from '@//:modules/focus';
import Lobby from './components/Lobby';
import { RootContext } from '../Root';
import { EMAIL } from '@//:modules/regex';
import Icon from '@//:modules/content/icon/Icon';
import { SignShapes } from '@streamlinehq/streamline-regular/lib/maps-navigation';
import type { JoinFragment$key } from '@//:artifacts/JoinFragment.graphql';
import { useLocation } from '@//:modules/routing';

type JoinValues = {
  email: string,
};

const JoinAction = graphql`
  mutation JoinMutation($data: AuthenticationInput!) {
    authenticate(data: $data)
  }
`;

const RootFragmentGQL = graphql`
  fragment JoinFragment on Authentication {
    cookie {
      redeemed
      registered
      email
    }
  }
`;

export default function Join(): Node {
  const rootQuery = useContext(RootContext);

  const data = useFragment<?JoinFragment$key>(
    RootFragmentGQL,
    rootQuery?.authentication,
  );

  const [t] = useTranslation('auth');

  const [commit, isInFlight] = useMutation(JoinAction);
  const instance = useForm<JoinValues>();

  const notify = useNotify();

  const location = useLocation();

  useEffect(() => {
    // TODO install UseQueryParams and change
    const search = new URLSearchParams(location.search);

    if (search.has('notify')) {
      switch (search.get('notify')) {
        case 'invalid_token':
          notify.error(t('authenticate.error.token'));
          break;
        default:
          break;
      }
    }
  }, [location.search]);

  // Receiving a subscription response
  const [authInfo, setAuthInfo] = useState({ authListener: null });

  // Waiting for a subscription
  const [waiting, setWaiting] = useState(false);

  const [email, setEmail] = useState(null);

  const changeAuth = data => {
    setAuthInfo(data);
    setWaiting(false);
  };

  const onSubmit = (val: JoinValues) => {
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
        notify.error(t('authenticate.error.join'));
      },
    });
  };

  // Checks for various types of states
  const emptySubscriptionResponse = authInfo.authListener === null;
  const emptyAuthCookie = !!data?.cookie === false;

  // If we're waiting on a token, create a subscription for the token
  // We don't have to send any values because it already knows the token
  // from a cookie.
  if (
    waiting ||
    (emptySubscriptionResponse && !emptyAuthCookie && !data?.cookie?.redeemed)
  ) {
    return (
      <Lobby
        // Use auth cookie's email as backup, since it may not be here after a refresh
        email={!emptyAuthCookie ? data?.cookie?.email : email}
        onReceive={changeAuth}
      />
    );
  }

  // User not registered - when we either receive this response from a subscription, or a page refresh
  const subscriptionNotRegistered =
    !emptySubscriptionResponse &&
    authInfo.authListener?.cookie.registered === false;

  // Cookie was redeemed, but the user is not registered
  const cookieRedeemedNotRegistered =
    !emptyAuthCookie && data?.cookie?.redeemed && !data.cookie?.registered;

  // We already have auth cookie data, and it's been redeemed. We want the user to registers
  if (subscriptionNotRegistered || cookieRedeemedNotRegistered) {
    return <Register />;
  }

  // Ask user to authenticate
  return (
    <Frame>
      <Icon
        icon={SignShapes.SignBadgeCircle}
        strokeWidth={2.5}
        stroke={'primary.500'}
        size={80}
        sx={{
          display: 'block',
          pb: 6,
          pt: 6,
          textAlign: 'center',
        }}
      />
      <Form instance={instance} onSubmit={onSubmit}>
        <Input
          title={t('authenticate.form.email.title')}
          name="email"
          validation={{
            required: {
              value: true,
              message: t('authenticate.form.validation.email.required'),
            },
            pattern: {
              value: EMAIL,
              message: t('authenticate.form.validation.email.pattern'),
            },
          }}
          placeholder={t('authenticate.form.email.placeholder')}
        />
        <Button
          loading={isInFlight}
          size={'large'}
          type={'buttons.primary.regular'}
          sx={{ width: 'fill', mt: 2 }}
        >
          {t('authenticate.form.continue')}
        </Button>
      </Form>
    </Frame>
  );
}
