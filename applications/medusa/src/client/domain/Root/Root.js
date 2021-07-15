/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery, useRefetchableFragment } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import type { RootAccountRefreshQuery } from '@//:artifacts/RootAccountRefreshQuery.graphql'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<RootQuery>,
  },
  children: Node,
};

const RootQueryGQL = graphql`
  query RootQuery {
    viewer {
      ...RootComponent_account
    }
  }
`

const RootFragmentGQL = graphql`
  fragment RootComponent_account on Query
  # @refetchable makes it so Relay autogenerates a query for
  # fetching this fragment
  @refetchable(queryName: "RootAccountRefreshQuery") {
    username
    roles
  }
`

export default function Root (props: Props): Node {
  const rootQuery = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  const [data, refetch] = useRefetchableFragment<RootAccountRefreshQuery>(
    RootFragmentGQL,
    props.prepared.stateQuery
  )

  console.log(data)

  return (
    <>
      <Helmet
        title='overdoll'
      />
      <Suspense fallback={null}>{props.children}</Suspense>
    </>
  )
}
