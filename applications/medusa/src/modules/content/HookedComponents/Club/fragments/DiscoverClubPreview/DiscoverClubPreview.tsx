import { DiscoverClubPreviewFragment$key } from '@//:artifacts/DiscoverClubPreviewFragment.graphql'
import { DiscoverClubPreviewViewerFragment$key } from '@//:artifacts/DiscoverClubPreviewViewerFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import { Box, Flex, Heading, HStack } from '@chakra-ui/react'
import { LinkTile } from '../../../../ContentSelection'
import ClubJoinLoggedOutButton from '../Interact/ClubJoinLoggedOutButton/ClubJoinLoggedOutButton'
import ClubJoinButton from '../Interact/ClubJoinButton/ClubJoinButton'
import ClubIcon from '../../../../PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import ClubBanner from '../../../../PageLayout/Display/fragments/Banner/ClubBanner/ClubBanner'

interface Props {
  clubQuery: DiscoverClubPreviewFragment$key
  viewerQuery: DiscoverClubPreviewViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment DiscoverClubPreviewFragment on Club {
    name
    slug
    viewerMember {
      __typename
    }
    ...ClubJoinButtonFragment
    ...ClubBannerFragment
    ...ClubJoinLoggedOutButtonFragment
    ...ClubIconFragment
  }
`

const ViewerFragment = graphql`
  fragment DiscoverClubPreviewViewerFragment on Account {
    ...ClubJoinButtonViewerFragment
  }
`

export default function DiscoverClubPreview (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Flex w='100%' h='100%' position='relative'>
      <LinkTile
        href={{
          pathname: '/[slug]',
          query: { slug: clubData.slug }
        }}
      >
        <ClubBanner clubQuery={clubData} />
      </LinkTile>
      <Box borderBottomRadius='md' bg='gray.800' p={2} right={0} bottom={0} left={0} position='absolute'>
        <HStack justify='space-between'>
          <HStack spacing={2}>
            <ClubIcon size='md' clubQuery={clubData} />
            <Heading size='md' color='gray.00'>
              {clubData.name}
            </Heading>
          </HStack>
          {viewerData == null
            ? <ClubJoinLoggedOutButton clubQuery={clubData} />
            : (clubData.viewerMember == null
                ? <ClubJoinButton clubQuery={clubData} viewerQuery={viewerData} />
                : <></>)}
        </HStack>
      </Box>
    </Flex>
  )
}
