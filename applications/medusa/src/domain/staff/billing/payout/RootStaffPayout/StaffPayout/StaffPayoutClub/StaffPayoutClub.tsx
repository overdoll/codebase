import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPayoutClubFragment$key } from '@//:artifacts/StaffPayoutClubFragment.graphql'
import { HStack } from '@chakra-ui/react'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import LargeClubHeader from '../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import ClubPageButton
  from '../../../../../../../common/components/MenuButtons/ClubPageButton/ClubPageButton'
import ClubStaffButton
  from '../../../../../../../common/components/MenuButtons/ClubStaffButton/ClubStaffButton'

interface Props {
  query: StaffPayoutClubFragment$key
}

const Fragment = graphql`
  fragment StaffPayoutClubFragment on ClubPayout {
    club {
      ...LargeClubHeaderFragment
      ...ClubPageButtonFragment
      ...ClubStaffButtonFragment
    }
  }
`

export default function StaffPayoutClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack spacing={2} justify='space-between'>
      <LargeClubHeader query={data.club} />
      <Menu
        p={1}
      >
        <ClubPageButton query={data.club} />
        <ClubStaffButton query={data.club} />
      </Menu>
    </HStack>
  )
}
