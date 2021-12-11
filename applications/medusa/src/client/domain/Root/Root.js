/**
 * @flow
 */
import type { Node } from 'react'
import { useMemo, Suspense } from 'react'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import Navigation from '../../../modules/content/Navigation/Navigation'
import defineAbility from '@//:modules/utilities/functions/defineAbility/defineAbility'
import { AbilityContext } from './helpers/AbilityContext'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

type Props = {
  prepared: {
    stateQuery: PreloadedQueryInner<RootQuery>,
  },
  children: Node,
};

const RootQueryGQL = graphql`
  query RootQuery {
    viewer {
      id
      ...NavigationFragment
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

  const ability = useMemo(() => defineAbility(data?.viewer), [data?.viewer])

  return (
    <>
      <Helmet
        title='overdoll'
      />
      <AbilityContext.Provider value={ability}>
        <Navigation query={data?.viewer}>
          <Suspense fallback={<CenteredSpinner />}>
            {props.children}
          </Suspense>
        </Navigation>
      </AbilityContext.Provider>
    </>
  )
}
