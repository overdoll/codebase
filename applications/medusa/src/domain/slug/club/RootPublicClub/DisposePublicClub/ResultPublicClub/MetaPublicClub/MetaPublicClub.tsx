import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaPublicClubFragment$key } from '@//:artifacts/MetaPublicClubFragment.graphql'
import { MetaPublicClubViewerFragment$key } from '@//:artifacts/MetaPublicClubViewerFragment.graphql'
import ContainerPublicClub from './ContainerPublicClub/ContainerPublicClub'
import PublicClubRichObject from './PublicClubRichObject/PublicClubRichObject'
import PublicClubStructuredData from './PublicClubStructuredData/PublicClubStructuredData'

interface Props {
  clubQuery: MetaPublicClubFragment$key
  viewerQuery: MetaPublicClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment MetaPublicClubFragment on Club {
    ...PublicClubRichObjectFragment
    ...PublicClubStructuredDataFragment
    ...ContainerPublicClubFragment
  }
`

const ViewerFragment = graphql`
  fragment MetaPublicClubViewerFragment on Account {
    ...ContainerPublicClubViewerFragment
  }
`

export default function MetaPublicClub (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <PublicClubRichObject query={clubData} />
      <PublicClubStructuredData query={clubData} />
      <ContainerPublicClub clubQuery={clubData} viewerQuery={viewerData} />
    </>
  )
}
