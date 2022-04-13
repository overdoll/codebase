import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffClubSupporterSubscriptionClubFragment$key
} from '@//:artifacts/StaffClubSupporterSubscriptionClubFragment.graphql'
import { Box, HStack, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LargeClubHeader from '../../../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubPageButton from '../../../../../PublicClub/PublicClub/ClubMenu/ClubPageButton/ClubPageButton'
import ClubStaffButton from '../../../../../PublicClub/PublicClub/ClubMenu/ClubStaffButton/ClubStaffButton'

interface Props {
  query: StaffClubSupporterSubscriptionClubFragment$key
}

const Fragment = graphql`
  fragment StaffClubSupporterSubscriptionClubFragment on IAccountClubSupporterSubscription {
    club {
      ...LargeClubHeaderFragment
      ...ClubPageButtonFragment
      ...ClubStaffButtonFragment
    }
  }
`

export default function StaffClubSupporterSubscriptionClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Club
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <HStack spacing={2} justify='space-between'>
          <LargeClubHeader query={data.club} />
          <Menu
            p={1}
          >
            <ClubPageButton query={data.club} />
            <ClubStaffButton query={data.club} />
          </Menu>
        </HStack>
      </Box>
    </Stack>
  )
}
