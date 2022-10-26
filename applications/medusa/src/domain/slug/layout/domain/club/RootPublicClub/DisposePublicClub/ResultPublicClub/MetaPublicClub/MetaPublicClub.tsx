import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { MetaPublicClubFragment$key } from '@//:artifacts/MetaPublicClubFragment.graphql'
import ContainerPublicClub from './ContainerPublicClub/ContainerPublicClub'
import PublicClubRichObject from './PublicClubRichObject/PublicClubRichObject'
import PublicClubStructuredData from './PublicClubStructuredData/PublicClubStructuredData'

interface Props {
  clubQuery: MetaPublicClubFragment$key
}

const ClubFragment = graphql`
  fragment MetaPublicClubFragment on Club {
    ...PublicClubRichObjectFragment
    ...PublicClubStructuredDataFragment
    ...ContainerPublicClubFragment
  }
`

export default function MetaPublicClub (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  return (
    <>
      <PublicClubRichObject query={clubData} />
      <PublicClubStructuredData query={clubData} />
      <ContainerPublicClub clubQuery={clubData} />
    </>
  )
}
