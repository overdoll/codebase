import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountCancelledClubSupporterSubscriptionSettingsFragment$key
} from '@//:artifacts/AccountCancelledClubSupporterSubscriptionSettingsFragment.graphql'
import {
  LargeBackgroundBox,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Box, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ClubExclusivePosts from '../../../../../../ClubPublicPage/ClubPublicPage/ClubExclusivePosts/ClubExclusivePosts'
import ManageCancelledSubscriptionButton from './ManageCancelledSubscriptionButton/ManageCancelledSubscriptionButton'
import AccountCancelledClubSupporterSubscriptionDetails
  from '../../../../components/AccountCancelledClubSupporterSubscriptionDetails/AccountCancelledClubSupporterSubscriptionDetails'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: AccountCancelledClubSupporterSubscriptionSettingsFragment$key
}

const Fragment = graphql`
  fragment AccountCancelledClubSupporterSubscriptionSettingsFragment on AccountCancelledClubSupporterSubscription {
    ...AccountCancelledClubSupporterSubscriptionDetailsFragment
    ...ManageCancelledSubscriptionButtonFragment
    club {
      slug
      ...ClubExclusivePostsFragment
    }
  }
`

export default function AccountCancelledClubSupporterSubscriptionSettings ({
  query
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
            <AccountCancelledClubSupporterSubscriptionDetails query={data} />
            <LinkButton w='100%' size='md' colorScheme='gray' to={`/${data.club.slug}`}>
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
        <ClubExclusivePosts query={data.club} />
      </Box>
      <ManageCancelledSubscriptionButton query={data} />
    </Stack>
  )
}