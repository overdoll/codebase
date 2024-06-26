import { graphql, useFragment } from 'react-relay/hooks'
import { ClubJoinTileFragment$key } from '@//:artifacts/ClubJoinTileFragment.graphql'
import { ClubJoinTileViewerFragment$key } from '@//:artifacts/ClubJoinTileViewerFragment.graphql'
import { ClubTileOverlay, LinkTile } from '../../../../../ContentSelection'
import { Box, Flex } from '@chakra-ui/react'
import ClubJoinButton from '../../../../Club/fragments/Interact/ClubJoinButton/ClubJoinButton'
import ClubJoinLoggedOutButton
  from '../../../../Club/fragments/Interact/ClubJoinLoggedOutButton/ClubJoinLoggedOutButton'

interface Props {
  clubQuery: ClubJoinTileFragment$key
  viewerQuery: ClubJoinTileViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinTileFragment on Club {
    slug
    viewerMember {
      __typename
    }
    ...ClubJoinButtonFragment
    ...ClubTileOverlayFragment
    ...ClubJoinLoggedOutButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinTileViewerFragment on Account {
    ...ClubJoinButtonViewerFragment
  }
`

export default function ClubJoinTile (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

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
        {viewerData == null
          ? <ClubJoinLoggedOutButton clubQuery={clubData} />
          : (clubData.viewerMember == null
              ? <ClubJoinButton clubQuery={clubData} viewerQuery={viewerData} />
              : <></>)}
      </Box>
    </Flex>
  )
}
