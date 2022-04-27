import { ReactNode, Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import { PageProps } from '@//:types/app'
import NoScript from './NoScript/NoScript'

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
  }
`

const Root: PageProps<Props> = (props: Props): JSX.Element => {
  const data = usePreloadedQuery<RootQueryType>(
    Query,
    props.queryRefs.rootQuery
  )

  return (
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
  )
}

export default Root
