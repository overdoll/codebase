import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { HeaderPublicClubFragment$key } from '@//:artifacts/HeaderPublicClubFragment.graphql'
import { HeaderPublicClubViewerFragment$key } from '@//:artifacts/HeaderPublicClubViewerFragment.graphql'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import ClubExternalLinks from './ClubExternalLinks/ClubExternalLinks'
import ClubJoinLeaveButton
  from '@//:modules/content/HookedComponents/Club/fragments/Interact/ClubJoinLeaveButton/ClubJoinLeaveButton'

interface Props {
  clubQuery: HeaderPublicClubFragment$key
  viewerQuery: HeaderPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment HeaderPublicClubFragment on Club {
    name
    ...ClubExternalLinksFragment
    ...ClubJoinLeaveButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment HeaderPublicClubViewerFragment on Account {
    ...ClubJoinLeaveButtonViewerFragment
  }
`

export default function HeaderPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={2}>
      <HStack justify='space-between'>
        <Stack spacing={2}>
          <Heading letterSpacing='wider' color='gray.00' fontSize='4xl' fontWeight='bold' noOfLines={2}>
            {clubData.name}
          </Heading>
          <ClubExternalLinks clubQuery={clubData} />
        </Stack>
        <ClubJoinLeaveButton clubQuery={clubData} viewerQuery={viewerData} />
      </HStack>
    </Stack>
  )
}
