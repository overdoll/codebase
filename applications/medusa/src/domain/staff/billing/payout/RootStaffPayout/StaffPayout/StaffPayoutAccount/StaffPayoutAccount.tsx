import { graphql, useFragment } from 'react-relay/hooks'
import type { StaffPayoutAccountFragment$key } from '@//:artifacts/StaffPayoutAccountFragment.graphql'
import { Box, HStack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LargeAccountHeader from '../../../../../../../common/components/LargeAccountHeader/LargeAccountHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ProfilePageButton
  from '../../../../../../profile/RootProfile/Profile/ProfileMenu/ProfilePageButton/ProfilePageButton'
import ProfileStaffButton
  from '../../../../../../profile/RootProfile/Profile/ProfileMenu/ProfileStaffButton/ProfileStaffButton'

interface Props {
  query: StaffPayoutAccountFragment$key
}

const Fragment = graphql`
  fragment StaffPayoutAccountFragment on ClubPayout {
    payoutAccount {
      ...LargeAccountHeaderFragment
      ...ProfilePageButtonFragment
      ...ProfileStaffButtonFragment
    }
  }
`

export default function StaffPayoutAccount ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Box>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Payout Account
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <HStack spacing={2} justify='space-between'>
        <LargeAccountHeader query={data.payoutAccount} />
        <Menu
          p={1}
        >
          <ProfilePageButton query={data.payoutAccount} />
          <ProfileStaffButton query={data.payoutAccount} />
        </Menu>
      </HStack>
    </Box>
  )
}
