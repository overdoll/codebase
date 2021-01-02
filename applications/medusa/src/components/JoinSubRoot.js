import {
  graphql,
  useSubscription,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { useState, useMemo } from 'react';

const subscription = graphql`
  subscription JoinSubRootSubscription {
    authenticationState {
      authorized
      registered
    }
  }
`;

export default function JoinSubRoot({ props }) {
  const config = useMemo(() => ({ variables: {}, subscription }), []);

  useSubscription(config);

  return <div>Move Fast</div>;
}
