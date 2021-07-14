/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
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
    authenticatedAccount {
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

  const ability = defineAbility(rootQuery.authenticatedAccount)

  return (
    <>
      <AbilityContext.Provider value={ability}>
        <Helmet
          title='overdoll'
        />
        <NavigationBar
          account={rootQuery.authenticatedAccount} refreshUserQuery={refresh}
        ><Suspense fallback={null}>{props.children}</Suspense>
        </NavigationBar>
      </AbilityContext.Provider>
    </>
  )
}
