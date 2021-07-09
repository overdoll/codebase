/**
 * @flow
 */
import type { Context, Node } from 'react'
import { createContext, Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { RootQuery, RootQueryResponse } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
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
    authentication {
      user {
        username
        roles
      }
      ...JoinFragment
    }
  }
`

const RootContext: Context<?RootQueryResponse> = createContext(null)

export default function Root (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  const rootQuery = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    queryRef
  )

  const refresh = () => {
    const { variables } = props.prepared.stateQuery
    loadQuery(variables, { fetchPolicy: 'network-only' })
  }

  const ability = defineAbility(rootQuery.authentication?.user)

  return (
    <RootContext.Provider value={rootQuery}>
      <AbilityContext.Provider value={ability}>
        <Helmet
          title='overdoll'
        />
        <NavigationBar
          user={rootQuery.authentication.user} refreshUserQuery={refresh}
        ><Suspense fallback={null}>{props.children}</Suspense>
        </NavigationBar>
      </AbilityContext.Provider>
    </RootContext.Provider>
  )
}

export { RootContext }
