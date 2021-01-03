import { graphql, useSubscription } from 'react-relay/hooks';
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
  const config = useMemo(
    () => ({
      variables: {},
      subscription,
      onNext: response => console.log(response),
    }),
    [],
  );

  useSubscription(config);

  return <div>Move Fast</div>;
}
