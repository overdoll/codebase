import { ReactNode, Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import NoScript from './NoScript/NoScript'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import Head from 'next/head'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    rootQuery: PreloadedQuery<RootQueryType>
  }
  children: ReactNode
}

const Query = graphql`
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

const Root: PageProps<Props> = (props: Props): JSX.Element => {
  const data = usePreloadedQuery<RootQueryType>(
    Query,
    props.queryRefs.rootQuery
  )

  return (
    <>
      <Head>
        <title>overdoll :: Find Your Club</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AccountAuthorizer queryRef={data.viewer}>
        <UniversalNavigator queryRef={data.viewer} />
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

export default Root
