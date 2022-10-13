import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerHomeViewerFragment$key } from '@//:artifacts/ContainerHomeViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerHome from './BannerHome/BannerHome'
import SecretBox from './TilesHome/components/SecretBox/SecretBox'
import BoxesHome from './BoxesHome/BoxesHome'

interface Props {
  viewerQuery: ContainerHomeViewerFragment$key | null
}

const ViewerFragment = graphql`
  fragment ContainerHomeViewerFragment on Account {
    ...BannerHomeViewerFragment
    ...BoxesHomeFragment
  }
`

export default function ContainerHome (props: Props): JSX.Element {
  const {
    viewerQuery
  } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer pt={2}>
        <BannerHome viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <BoxesHome viewerQuery={viewerData} />
        <SecretBox />
      </ContentContainer>
    </>
  )
}
