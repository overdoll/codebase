import { PreloadedQuery, usePreloadedQuery, useSubscribeToInvalidationState } from 'react-relay/hooks'
import type { ResultRootQuery } from '@//:artifacts/ResultRootQuery.graphql'
import { graphql } from 'react-relay'
import React, { ReactNode } from 'react'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import PageContents from './PageContents/PageContents'
import SafeModal from './SafeModal/SafeModal'
import NoScript from './NoScript/NoScript'
import RootRichObject from '@//:common/rich-objects/default/RootRichObject/RootRichObject'
import dynamic from 'next/dynamic'
import { ViewCounterProvider } from './ViewCounter/ViewCounter'
import { JoinModalProvider } from './JoinModal/JoinModal'

const DynamicRouteProgressBar = dynamic(
  async () => {
    return await import('./RouteProgressBar/RouteProgressBar')
  },
  { ssr: false }
)

const DynamicNavigationPopup = dynamic(
  async () => {
    return await import('./NavigationPopup/NavigationPopup')
  },
  { ssr: false }
)

interface Props {
  children: ReactNode
  query: PreloadedQuery<ResultRootQuery>
  loadQuery: () => void
}

const Query = graphql`
  query ResultRootQuery {
    viewer {
      id
      ...AccountAuthorizerFragment
      ...NavigationPopupFragment
    }
  }
`
export default function ResultRoot (props: Props): JSX.Element {
  const {
    query,
    loadQuery,
    children
  } = props

  const data = usePreloadedQuery<ResultRootQuery>(
    Query,
    query
  )

  useSubscribeToInvalidationState([data?.viewer?.id as string], () => {
    loadQuery()
  })

  return (
    <>
      <AccountAuthorizer queryRef={data.viewer}>
        <ViewCounterProvider>
          <UniversalNavigator />
          <PageContents>
            {children}
          </PageContents>
        </ViewCounterProvider>
      </AccountAuthorizer>
      <NoScript />
      <DynamicRouteProgressBar />
      <DynamicNavigationPopup query={data.viewer} />
      <SafeModal />
      <RootRichObject />
    </>
  )
}
