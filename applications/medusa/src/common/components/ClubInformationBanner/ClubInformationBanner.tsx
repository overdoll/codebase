import { graphql, useFragment } from 'react-relay/hooks'
import { ClubInformationBannerFragment$key } from '@//:artifacts/ClubInformationBannerFragment.graphql'
import SuspendedClubBanner from './SuspendedClubBanner/SuspendedClubBanner'
import TerminatedClubBanner from './TerminatedClubBanner/TerminatedClubBanner'

interface Props {
  query: ClubInformationBannerFragment$key
}

const Fragment = graphql`
  fragment ClubInformationBannerFragment on Club {
    suspension {
      __typename
    }
    termination {
      __typename
    }
    ...TerminatedClubBannerFragment
    ...SuspendedClubBannerFragment
  }
`

export default function ClubInformationBanner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.termination != null) {
    return <TerminatedClubBanner query={data} />
  }

  if (data.suspension != null) {
    return <SuspendedClubBanner query={data} />
  }

  return (
    <></>
  )
}
