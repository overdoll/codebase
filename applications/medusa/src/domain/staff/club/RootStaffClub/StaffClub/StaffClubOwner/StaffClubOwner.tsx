import { graphql, useFragment } from 'react-relay/hooks'
import { StaffClubOwnerFragment$key } from '@//:artifacts/StaffClubOwnerFragment.graphql'
import { Box, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import LargeAccountHeader from '../../../../../../common/components/LargeAccountHeader/LargeAccountHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ProfilePageButton
  from '../../../../../profile/RootProfile/Profile/ProfileMenu/ProfilePageButton/ProfilePageButton'
import ProfileStaffButton
  from '../../../../../profile/RootProfile/Profile/ProfileMenu/ProfileStaffButton/ProfileStaffButton'
import PayoutMethod
  from '../../../../../settings/payouts/method/RootPayoutMethodSettings/PayoutMethodSettings/PayoutMethod/PayoutMethod'
import AccountDetails
  from '../../../../../settings/payouts/root/RootPayoutsSettings/PayoutsSettings/PayoutsDetailsSettings/AccountDetails/AccountDetails'
import StaffClubTransferOwnership from '../StaffClubTransferOwnership/StaffClubTransferOwnership'

interface Props {
  query: StaffClubOwnerFragment$key
}

const Fragment = graphql`
  fragment StaffClubOwnerFragment on Club {
    owner {
      ...LargeAccountHeaderFragment
      ...ProfilePageButtonFragment
      ...ProfileStaffButtonFragment
      payoutMethod {
        ...PayoutMethodFragment
      }
      details {
        ...AccountDetailsFragment
      }
    }
    ...StaffClubTransferOwnershipFragment
  }
`

export default function StaffClubOwner ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Owner
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <HStack spacing={2} justify='space-between'>
          <LargeAccountHeader query={data.owner} />
          <Menu
            p={1}
          >
            <ProfilePageButton query={data.owner} />
            <ProfileStaffButton query={data.owner} />
          </Menu>
        </HStack>
      </Box>
      {data.owner.details != null
        ? (
          <LargeBackgroundBox>
            <AccountDetails query={data.owner.details} />
          </LargeBackgroundBox>)
        : (
          <LargeBackgroundBox>
            <Trans>
              No payout details entered for this account
            </Trans>
          </LargeBackgroundBox>)}
      {data.owner.payoutMethod != null
        ? (
          <LargeBackgroundBox>
            <PayoutMethod query={data.owner.payoutMethod} />
          </LargeBackgroundBox>)
        : (
          <LargeBackgroundBox>
            <Trans>
              No payout method set up for this account
            </Trans>
          </LargeBackgroundBox>)}
      <StaffClubTransferOwnership query={data} />
    </Stack>

  )
}
