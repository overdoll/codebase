import { ReactNode } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import LockedAccountBanner from './LockedAccountBanner/LockedAccountBanner'
import PageContents from './PageContents/PageContents'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import LocaleCreator from './LocaleCreator/LocaleCreator'

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
    ...LocaleCreatorFragment
  }
`

export default function Root (props: Props): JSX.Element {
  const data = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.prepared.stateQuery
  )

  return (
    <LocaleCreator queryRef={data}>
      <Helmet
        title='overdoll'
      />
      <AccountAuthorizer queryRef={data.viewer}>
        <LockedAccountBanner queryRef={data.viewer} />
        <UniversalNavigator queryRef={data.viewer} />
        <PageContents>
          {props.children}
        </PageContents>
      </AccountAuthorizer>
    </LocaleCreator>

  )
}
