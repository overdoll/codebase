import { Helmet } from 'react-helmet-async'
import type { PreloadedQuery } from 'react-relay/hooks'
import { PageWrapper } from '@//:modules/content/PageLayout'
import RootCurationSettings from './RootCurationSettings/RootCurationSettings'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'

interface Props {
  prepared: {
    curationQuery: PreloadedQuery<CurationSettingsQueryType>
  }
}

export default function Preferences (props: Props): JSX.Element {
  return (
    <>
      <Helmet title='preference settings' />
      <PageWrapper>
        <RootCurationSettings query={props.prepared.curationQuery} />
      </PageWrapper>
    </>
  )
}
