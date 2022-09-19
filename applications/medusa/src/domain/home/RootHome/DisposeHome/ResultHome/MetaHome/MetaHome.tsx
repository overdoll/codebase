import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaHomeViewerFragment$key } from '@//:artifacts/MetaHomeViewerFragment.graphql'
import RootStructuredData from '@//:common/structured-data/RootStructuredData/RootStructuredData'
import RootHomeRichObject from './RootHomeRichObject/RootHomeRichObject'
import ContainerHome from './ContainerHome/ContainerHome'

interface Props {
  viewerQuery: MetaHomeViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment MetaHomeViewerFragment on Account {
    ...ContainerHomeViewerFragment
  }
`

export default function MetaHome (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <RootHomeRichObject />
      <RootStructuredData />
      <ContainerHome viewerQuery={viewerData} />
    </>
  )
}
