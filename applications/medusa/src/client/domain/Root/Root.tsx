import { ReactNode, Suspense, useMemo } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import Navigation from '../../../modules/content/Navigation/Navigation'
import defineAbility from '@//:modules/support/defineAbility/defineAbility'
import { AbilityContext } from './helpers/AbilityContext'
import CenteredSpinner from '@//:modules/content/CenteredSpinner/CenteredSpinner'

interface Props {
  prepared: {
    stateQuery: PreloadedQuery<RootQuery>
  }
  children: ReactNode
}

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

export default function Root (props: Props): JSX.Element {
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
