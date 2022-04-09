import { ReactNode } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import NoScript from './NoScript/NoScript'

interface Props {
  queryRefs: {
    rootQuery: PreloadedQuery<RootQuery>
  }
  children: ReactNode
}

const RootQueryGQL = graphql`
  query RootQuery @preloadable {
    viewer {
      ...AccountAuthorizerFragment
      ...UniversalNavigatorFragment
    }
    language {
      locale
    }
  }
`

const Root = (props: Props): JSX.Element => {
  const data = usePreloadedQuery<RootQuery>(
    RootQueryGQL,
    props.queryRefs.rootQuery
  )

  return (
    <>
      {/* <Helmet> */}
      {/*  <title>overdoll :: Find Your Club</title> */}
      {/*  <meta name='viewport' content='width=device-width' /> */}
      {/* </Helmet> */}
      <AccountAuthorizer queryRef={data.viewer}>
        {/* <UniversalNavigator queryRef={data.viewer} /> */}
        <PageContents>
          {props.children}
        </PageContents>
        <NoScript />
      </AccountAuthorizer>
    </>
  )
}

Root.getRelayPreloadProps = () => ({
  queries: {
    rootQuery: {
      params: RootQueryGQL.default.params,
      variables: {}
    }
  }
})

export default Root
