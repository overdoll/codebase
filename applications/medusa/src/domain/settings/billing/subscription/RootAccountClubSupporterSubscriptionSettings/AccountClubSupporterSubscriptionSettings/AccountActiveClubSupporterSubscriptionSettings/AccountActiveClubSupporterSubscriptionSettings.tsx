import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountActiveClubSupporterSubscriptionSettingsFragment$key
} from '@//:artifacts/AccountActiveClubSupporterSubscriptionSettingsFragment.graphql'
import {
  LargeBackgroundBox,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Box, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ManageActiveSubscriptionButton from './ManageActiveSubscriptionButton/ManageActiveSubscriptionButton'
import { ConnectionProp } from '@//:types/components'
import AccountActiveClubSupporterSubscriptionDetails
  from '../AccountActiveClubSupporterSubscriptionDetails/AccountActiveClubSupporterSubscriptionDetails'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ClubExclusiveContentSuspensionNotice
  from '../ClubExclusiveContentSuspensionNotice/ClubExclusiveContentSuspensionNotice'

interface Props extends ConnectionProp {
  query: AccountActiveClubSupporterSubscriptionSettingsFragment$key
}

const Fragment = graphql`
  fragment AccountActiveClubSupporterSubscriptionSettingsFragment on AccountActiveClubSupporterSubscription {
    ...AccountActiveClubSupporterSubscriptionDetailsFragment
    ...ManageActiveSubscriptionButtonFragment
    club {
      slug
      ...ClubExclusiveContentSuspensionNoticeFragment
    }
  }
`

export default function AccountActiveClubSupporterSubscriptionSettings ({
  query,
  connectionId
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Subscription Details
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <LargeBackgroundBox>
          <Stack spacing={2}>
            <AccountActiveClubSupporterSubscriptionDetails query={data} />
            <LinkButton w='100%' size='md' colorScheme='gray' href={`/${data.club.slug}`}>
              <Trans>
                View Club
              </Trans>
            </LinkButton>
          </Stack>
        </LargeBackgroundBox>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Club Benefits
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              As a supporter, you have access to all exclusive content from this club.
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <ClubExclusiveContentSuspensionNotice query={data.club} />
      </Box>
      <ManageActiveSubscriptionButton connectionId={connectionId} query={data} />
    </Stack>
  )
}
