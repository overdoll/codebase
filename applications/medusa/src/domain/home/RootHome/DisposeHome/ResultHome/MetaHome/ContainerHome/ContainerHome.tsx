import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerHomeViewerFragment$key } from '@//:artifacts/ContainerHomeViewerFragment.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import BoxesHome from './BoxesHome/BoxesHome'
import UrlCurationProfile from './UrlCurationProfile/UrlCurationProfile'

interface Props {
  viewerQuery: ContainerHomeViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment ContainerHomeViewerFragment on Account {
    ...BoxesHomeFragment
    ...UrlCurationProfileFragment
  }
`

export default function ContainerHome (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ContentContainer pt={2}>
      <BoxesHome viewerQuery={viewerData} />
      <UrlCurationProfile viewerQuery={viewerData} />
    </ContentContainer>
  )
}
