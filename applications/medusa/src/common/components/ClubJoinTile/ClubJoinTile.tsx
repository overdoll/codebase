import { graphql, useFragment } from 'react-relay/hooks'
import { ClubJoinTileFragment$key } from '@//:artifacts/ClubJoinTileFragment.graphql'
import { ClubJoinTileViewerFragment$key } from '@//:artifacts/ClubJoinTileViewerFragment.graphql'

import { ClubTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'
import { Box, Flex } from '@chakra-ui/react'
import ClubJoinTileIconButton from './ClubJoinTileIconButton/ClubJoinTileIconButton'

interface Props {
  clubQuery: ClubJoinTileFragment$key
  viewerQuery: ClubJoinTileViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinTileFragment on Club {
    slug
    ...ClubJoinTileIconButtonFragment
    ...ClubTileOverlayFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinTileViewerFragment on Account {
    ...ClubJoinTileIconButtonViewerFragment
  }
`

export default function ClubJoinTile ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Flex w='100%' h='100%' position='relative'>
      <LinkTile href={{
        pathname: '/[slug]',
        query: { slug: clubData.slug }
      }}
      >
        <ClubTileOverlay query={clubData} />
      </LinkTile>
      <Box p={2} right={0} top={0} position='absolute'>
        <ClubJoinTileIconButton clubQuery={clubData} viewerQuery={viewerData} />
      </Box>
    </Flex>
  )
}
