import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerRandomFragment$key } from '@//:artifacts/ContainerRandomFragment.graphql'
import { ContainerRandomViewerFragment$key } from '@//:artifacts/ContainerRandomViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerRandom from './BannerRandom/BannerRandom'
import ScrollRandom from './ScrollRandom/ScrollRandom'

interface Props {
  rootQuery: ContainerRandomFragment$key
  viewerQuery: ContainerRandomViewerFragment$key | null
}

const RootFragment = graphql`
  fragment ContainerRandomFragment on Query {
    ...ScrollRandomFragment
  }
`

const ViewerFragment = graphql`
  fragment ContainerRandomViewerFragment on Account {
    ...BannerRandomViewerFragment
  }
`

export default function ContainerRandom (props: Props): JSX.Element {
  const {
    rootQuery,
    viewerQuery
  } = props

  const rootData = useFragment(RootFragment, rootQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <BannerContainer pt={2}>
        <BannerRandom viewerQuery={viewerData} />
      </BannerContainer>
      <ContentContainer>
        <ScrollRandom rootQuery={rootData} />
      </ContentContainer>
    </>
  )
}
