import { ReactNode } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import LockedAccountBanner from './LockedAccountBanner/LockedAccountBanner'
import PageContents from './PageContents/PageContents'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'

interface Props {
  prepared: {
    stateQuery: PreloadedQuery<RootQuery>
  }
  children: ReactNode
}

const RootQueryGQL = graphql`
  query RootQuery {
    viewer {
      ...AccountAuthorizerFragment
      ...UniversalNavigatorFragment
      ...LockedAccountBannerFragment
    }
    language {
      locale
    }
  }
`

export default function Root (props: Props): JSX.Element {
  const data = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  return (
    <>
      <Helmet
        title='overdoll'
      />
      <AccountAuthorizer queryRef={data.viewer}>
        <UniversalNavigator queryRef={data.viewer} />
        <PageContents>
          <LockedAccountBanner queryRef={data.viewer} />
          {props.children}
        </PageContents>
      </AccountAuthorizer>
    </>
  )
}
