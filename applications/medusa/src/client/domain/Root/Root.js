/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<RootQuery>,
  },
  children: Node,
};

const RootQueryGQL = graphql`
  query RootQuery {
    authenticatedAccount {
      username
      roles
    }
  }
`

export default function Root (props: Props): Node {
  const rootQuery = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  return (
    <>
      <Helmet
        title='overdoll'
      />
      <Suspense fallback={null}>{props.children}</Suspense>
    </>
  )
}
