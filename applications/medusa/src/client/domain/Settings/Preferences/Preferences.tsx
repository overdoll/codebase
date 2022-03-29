import { Helmet } from 'react-helmet-async'
import type { PreloadedQuery } from 'react-relay/hooks'
import { PageWrapper } from '@//:modules/content/PageLayout'
import RootCurationSettings from './RootCurationSettings/RootCurationSettings'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'
import { ReactNode } from 'react'
import ChildrenBoundary from '../../../components/ChildrenBoundary/ChildrenBoundary'

interface Props {
  prepared: {
    curationQuery: PreloadedQuery<CurationSettingsQueryType>
  }
  children: ReactNode
}

export default function Preferences (props: Props): JSX.Element {
  return (
    <ChildrenBoundary fallback={props.children}>
      <Helmet title='preference settings' />
      <PageWrapper>
        <RootCurationSettings query={props.prepared.curationQuery} />
      </PageWrapper>
    </ChildrenBoundary>
  )
}
