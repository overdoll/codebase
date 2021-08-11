/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import NavigationBar from './NavigationBar/NavigationBar'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'
import { AbilityContext } from './helpers/AbilityContext'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'
import routes from './NavigationBar/routing/navigation'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<RootQuery>,
  },
  children: Node,
};

const RootQueryGQL = graphql`
  query RootQuery {
    viewer {
      ...TopRightMenuFragment
      isModerator
      isStaff
      lock {
        reason
        expires
      }
    }
  }
`

export default function Root (props: Props): Node {
  const data = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  const ability = defineAbility(
    data?.viewer
  )

  return (
    <>
      <Helmet
        title='overdoll'
      />
      <AbilityContext.Provider value={ability}>
        <NavigationBar routes={routes} rootQuery={data?.viewer}>
          <Suspense fallback={<CenteredSpinner />}>{props.children}</Suspense>
        </NavigationBar>
      </AbilityContext.Provider>
    </>
  )
}
