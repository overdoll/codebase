import { Helmet } from 'react-helmet-async'
import type { PreloadedQuery } from 'react-relay/hooks'
import type { AccountSettingsQuery } from '@//:artifacts/AccountSettingsQuery.graphql'
import { PageWrapper } from '@//:modules/content/PageLayout'
import RootAccountSettings from './RootAccountSettings/RootAccountSettings'
import { ReactNode } from 'react'
import ChildrenBoundary from '../../../../modules/content/Placeholder/Fallback/ChildrenBoundary/ChildrenBoundary'

interface Props {
  prepared: {
    query: PreloadedQuery<AccountSettingsQuery>
  }
  children: ReactNode
}

export default function Profile (props: Props): JSX.Element {
  return (
    <ChildrenBoundary fallback={props.children}>
      <Helmet>
        <title>
          Profile - Settings :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <RootAccountSettings query={props.prepared.query} />
      </PageWrapper>
    </ChildrenBoundary>
  )
}
