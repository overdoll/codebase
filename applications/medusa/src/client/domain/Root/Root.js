/**
 * @flow
 */
import type { Node } from 'react'
import { createContext, Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery, useRefetchableFragment } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import NavigationBar from './NavigationBar/NavigationBar'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'
import { AbilityContext } from './helpers/AbilityContext'

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
      avatar
      lock {
        reason
        expires
      }
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

  const ability = defineAbility(data.viewer)

  const fetchAccount = () => refetch({}, { fetchPolicy: 'network-only' })

  return (
    <>
      <Helmet
        title='overdoll'
      />
      <AbilityContext.Provider value={ability}>
        <RootContext.Provider value={{ fetchAccount }}>
          <NavigationBar
            account={data.viewer} refreshUserQuery={fetchAccount}
          >
            <Suspense fallback={null}>{props.children}</Suspense>
          </NavigationBar>
        </RootContext.Provider>
      </AbilityContext.Provider>
    </>
  )
}

export { RootContext }
