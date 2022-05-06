import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPaymentClubFragment$key } from '@//:artifacts/StaffPaymentClubFragment.graphql'
import LargeClubHeader from '../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubPageButton
  from '../../../../../../[slug]/root/RootPublicClub/PublicClub/ClubMenu/ClubPageButton/ClubPageButton'
import ClubStaffButton
  from '../../../../../../[slug]/root/RootPublicClub/PublicClub/ClubMenu/ClubStaffButton/ClubStaffButton'
import { HStack } from '@chakra-ui/react'

interface Props {
  query: StaffPaymentClubFragment$key
}

const Fragment = graphql`
  fragment StaffPaymentClubFragment on ClubPayment {
    destinationClub {
      ...LargeClubHeaderFragment
      ...ClubPageButtonFragment
      ...ClubStaffButtonFragment
    }
  }
`

export default function StaffPaymentClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack spacing={2} justify='space-between'>
      <LargeClubHeader query={data.destinationClub} />
      <Menu
        p={1}
      >
        <ClubPageButton query={data.destinationClub} />
        <ClubStaffButton query={data.destinationClub} />
      </Menu>
    </HStack>
  )
}
