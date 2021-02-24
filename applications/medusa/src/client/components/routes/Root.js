// @flow
import type { Context, Element, Node } from 'react';
import { createContext, Suspense } from 'react';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';
import type { PreloadedQuery } from 'react-relay/relay-experimental';
import type {
  RootQuery,
  RootQueryResponse,
} from './__generated__/RootQuery.graphql';

type Props = {
  prepared: {
    stateQuery: PreloadedQuery<RootQuery>,
  },
  children: Node,
};

const RootQueryGQL = graphql`
  query RootQuery {
    authentication {
      user {
        username
      }
      ...JoinFragment
    }
  }
`;

// Must assign a fake value since this will be resolved
const RootContext: Context<RootQueryResponse> = createContext({
  authentication: {
    user: {
      username: '',
    },
    $fragmentRefs: '',
  },
});

export default function Root(
  props: Props,
): Element<typeof RootContext.Provider> {
  const rootQuery = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery,
  );

  return (
    <RootContext.Provider value={rootQuery}>
      <Suspense fallback={null}>{props.children}</Suspense>
    </RootContext.Provider>
  );
}

export { RootContext };
