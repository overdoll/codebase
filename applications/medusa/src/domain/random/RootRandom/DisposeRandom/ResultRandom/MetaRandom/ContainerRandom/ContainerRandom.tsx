import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { ContainerRandomFragment$key } from '@//:artifacts/ContainerRandomFragment.graphql'
import { ContainerRandomViewerFragment$key } from '@//:artifacts/ContainerRandomViewerFragment.graphql'
import { BannerContainer, ContentContainer } from '@//:modules/content/PageLayout'
import BannerRandom from './BannerRandom/BannerRandom'
import HeaderRandom from './HeaderRandom/HeaderRandom'
import ScrollRandom from './ScrollRandom/ScrollRandom'
import { Stack } from '@chakra-ui/react'
import RandomizeButton from './HeaderRandom/RandomizeButton/RandomizeButton'

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
    ...ScrollRandomViewerFragment
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
        <Stack spacing={4}>
          <HeaderRandom />
          <RandomizeButton />
          <ScrollRandom rootQuery={rootData} viewerQuery={viewerData} />
        </Stack>
      </ContentContainer>
    </>
  )
}
