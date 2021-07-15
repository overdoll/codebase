/**
 * @flow
 */
import type { Node } from 'react'
import { createContext, Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery, useRefetchableFragment } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Flex, Spinner } from '@chakra-ui/react'
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
    ...RootComponent_account
  }
`

const RootFragmentGQL = graphql`
  fragment RootComponent_account on Query
  @refetchable(queryName: "RootAccountRefreshQuery") {
    viewer {
      username
      roles
    }
  }
`

const RootContext: Context = createContext(null)

export default function Root (props: Props): Node {
  const rootQuery = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  const [data, refetch] = useRefetchableFragment<RootAccountRefreshQuery, _>(
    RootFragmentGQL,
    rootQuery
  )

  const fetchAccount = () => refetch({}, { fetchPolicy: 'network-only' })

  return (
    <RootContext.Provider value={{ fetchAccount }}>
      <Helmet
        title='overdoll'
      />
      <Suspense fallback={<Flex mt={40} h='100%' align='center' justify='center' direction='column'><Spinner mb={6} thickness={4} size='xl' color='red.500' /></Flex>}>{props.children}</Suspense>
    </RootContext.Provider>
  )
}

export { RootContext }
