import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerBrowseFragment$key } from '@//:artifacts/ContainerBrowseFragment.graphql'
import { ContainerBrowseViewerFragment$key } from '@//:artifacts/ContainerBrowseViewerFragment.graphql'
import { BannerContainer, ContentContainer, MobileContainer } from '@//:modules/content/PageLayout'
import BannerBrowse from './BannerBrowse/BannerBrowse'
import HeaderBrowse from './HeaderBrowse/HeaderBrowse'
import ScrollBrowse from './ScrollBrowse/ScrollBrowse'

interface Props {
  rootQuery: ContainerBrowseFragment$key
  viewerQuery: ContainerBrowseViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ContainerBrowseFragment on Query {
    ...ScrollBrowseFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerBrowseViewerFragment on Account {
    ...BannerBrowseViewerFragment
    ...ScrollBrowseViewerFragment
  }
`

export default function ContainerBrowse (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer pt={2}>
        <BannerBrowse viewerQuery={viewerData} />
      </BannerContainer>
      <MobileContainer>
        <HeaderBrowse />
      </MobileContainer>
      <ContentContainer pt={8}>
        <ScrollBrowse rootQuery={rootData} viewerQuery={viewerData} />
      </ContentContainer>
    </>
  )
}
