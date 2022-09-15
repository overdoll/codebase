import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaHomeFragment$key } from '@//:artifacts/MetaHomeFragment.graphql'
import { MetaHomeViewerFragment$key } from '@//:artifacts/MetaHomeViewerFragment.graphql'
import { GlobalVideoManagerProvider } from '@//:modules/content/Posts'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'
import RootHomeRichObject from './RootHomeRichObject/RootHomeRichObject'
import ContainerHome from './ContainerHome/ContainerHome'

interface Props {
  rootQuery: MetaHomeFragment$key
  viewerQuery: MetaHomeViewerFragment$key | null
}

const RootFragment = graphql`
  fragment MetaHomeFragment on Query {
    ...ContainerHomeFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaHomeViewerFragment on Account {
    ...ContainerHomeViewerFragment
  }
`

export default function MetaHome (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <RootHomeRichObject />
      <RootStructuredData />
      <GlobalVideoManagerProvider>
        <ContainerHome rootQuery={rootData} viewerQuery={viewerData} />
      </GlobalVideoManagerProvider>
    </>
  )
}
