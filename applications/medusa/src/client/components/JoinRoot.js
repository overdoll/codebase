import {
  graphql,
  useMutation,
  useSubscription,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { requestSubscription } from 'react-relay';
import { useMemo, useState, useRef } from 'react';
import Register from './Register';
import { isNullableType } from 'graphql';

const joinAction = graphql`
  mutation JoinRootMutation($email: String!) {
    authenticate(email: $email) {
      success
    }
  }
`;

const subscription = graphql`
  subscription JoinRootSubscription {
    authenticationState {
      authorized
      registered
      redirect
    }
  }
`;

export default function JoinRoot({ props }) {
  const [commit, isInFlight] = useMutation(joinAction);

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
        email: email,
      },
      onCompleted(data) {
        setWaiting(true);
        console.log('request');
        disposableRef.current = requestSubscription(relayEnvironment, config);
      },
      onError(data) {},
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
      join
      <form onSubmit={onSubmit}>
        <input
          disabled={isInFlight}
          required
          type="text"
          value={email}
          onChange={onChange}
        />
        <input disabled={isInFlight} type="submit" value="Submit" />
      </form>
    </>
  );
}
