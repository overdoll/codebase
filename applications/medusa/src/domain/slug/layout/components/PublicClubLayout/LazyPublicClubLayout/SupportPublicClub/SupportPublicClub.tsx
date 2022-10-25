import { SupportPublicClubFragment$key } from '@//:artifacts/SupportPublicClubFragment.graphql'
import { SupportPublicClubViewerFragment$key } from '@//:artifacts/SupportPublicClubViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ClubSupportSelectMethod from './ClubSupportSelectMethod/ClubSupportSelectMethod'
import ClubSupportTransactionProcess from './ClubSupportTransactionProcess/ClubSupportTransactionProcess'
import ClubSupportPrompt from './ClubSupportPrompt/ClubSupportPrompt'

interface Props {
  clubQuery: SupportPublicClubFragment$key
  viewerQuery: SupportPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportPublicClubFragment on Club {
    canSupport
    viewerIsOwner
    ...ClubSupportSelectMethodFragment
    ...ClubSupportPromptFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportPublicClubViewerFragment on Account {
    ...ClubSupportSelectMethodViewerFragment
    ...ClubSupportPromptViewerFragment
  }
`

export default function SupportPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <ClubSupportPrompt clubQuery={clubData} viewerQuery={viewerData} />
      <ClubSupportTransactionProcess />
      {(viewerData != null && (clubData.canSupport && !clubData.viewerIsOwner)) && (
        <ClubSupportSelectMethod clubQuery={clubData} viewerQuery={viewerData} />
      )}
    </>
  )
}
