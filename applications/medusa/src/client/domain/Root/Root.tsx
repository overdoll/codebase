import { ReactNode, Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import RootQuery from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import NoScript from './NoScript/NoScript'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'

interface Props {
  queryRefs: {
    rootQuery: PreloadedQuery<RootQueryType>
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
  const data = usePreloadedQuery<RootQueryType>(
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
          <ErrorBoundary>
            <Suspense fallback={null}>
              {props.children}
            </Suspense>
          </ErrorBoundary>
        </PageContents>
        <NoScript />
      </AccountAuthorizer>
    </>
  )
}

Root.getRelayPreloadProps = () => ({
  queries: {
    rootQuery: {
      params: RootQuery.params,
      variables: {}
    }
  }
})

export default Root
