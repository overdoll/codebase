import { ReactNode } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import { Helmet } from 'react-helmet-async'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import NoScript from './NoScript/NoScript'

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
      <Helmet>
        <title>overdoll</title>
        <meta name='viewport' content='width=device-width' />
      </Helmet>
      <AccountAuthorizer queryRef={data.viewer}>
        <UniversalNavigator queryRef={data.viewer} />
        <PageContents>
          {props.children}
        </PageContents>
        <NoScript />
      </AccountAuthorizer>
    </>
  )
}
