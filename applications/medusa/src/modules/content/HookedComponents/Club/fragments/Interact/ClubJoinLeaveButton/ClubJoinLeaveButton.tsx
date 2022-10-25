import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinLeaveButtonFragment$key } from '@//:artifacts/ClubJoinLeaveButtonFragment.graphql'
import type { ClubJoinLeaveButtonViewerFragment$key } from '@//:artifacts/ClubJoinLeaveButtonViewerFragment.graphql'
import ClubJoinLoggedOutButton from '../ClubJoinLoggedOutButton/ClubJoinLoggedOutButton'
import ClubJoinButton from '../ClubJoinButton/ClubJoinButton'
import ClubLeaveButton from '../ClubLeaveButton/ClubLeaveButton'
import ClubJoinOwnerButton from '../ClubJoinOwnerButton/ClubJoinOwnerButton'

interface Props {
  clubQuery: ClubJoinLeaveButtonFragment$key
  viewerQuery: ClubJoinLeaveButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinLeaveButtonFragment on Club {
    viewerIsOwner
    viewerMember {
      __typename
    }
    ...ClubJoinLoggedOutButtonFragment
    ...ClubJoinButtonFragment
    ...ClubLeaveButtonFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinLeaveButtonViewerFragment on Account {
    ...ClubJoinButtonViewerFragment
  }
`

export default function ClubJoinLeaveButton (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (viewerData == null) {
    return <ClubJoinLoggedOutButton clubQuery={clubData} />
  }

  if (clubData.viewerIsOwner) {
    return <ClubJoinOwnerButton />
  }

  if (clubData.viewerMember != null) {
    return <ClubLeaveButton clubQuery={clubData} />
  }

  return (
    <ClubJoinButton clubQuery={clubData} viewerQuery={viewerData} />
  )
}
