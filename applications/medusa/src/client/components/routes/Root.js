/**
 * @flow
 */
import type { Context, Node } from 'react'
import { createContext, Suspense, useEffect } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery, RootQueryResponse } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import { useRuntime } from '@//:modules/runtime'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<RootQuery>,
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
`

const RootContext: Context<?RootQueryResponse> = createContext(null)

export default function Root (props: Props): Node {
  const rootQuery = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  return (
    <RootContext.Provider value={rootQuery}>
      <Helmet
        title='overdoll'
      />
      <Suspense fallback={null}>{props.children}</Suspense>
    </RootContext.Provider>
  )
}

export { RootContext }
