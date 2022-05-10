import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountCancelledClubSupporterSubscriptionSettingsFragment$key
} from '@//:artifacts/AccountCancelledClubSupporterSubscriptionSettingsFragment.graphql'
import { LargeBackgroundBox, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Box, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ManageCancelledSubscriptionButton from './ManageCancelledSubscriptionButton/ManageCancelledSubscriptionButton'
import AccountCancelledClubSupporterSubscriptionDetails
  from '../AccountCancelledClubSupporterSubscriptionDetails/AccountCancelledClubSupporterSubscriptionDetails'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ClubExclusivePosts
  from '../../../../../../[slug]/root/RootPublicClub/PublicClub/ClubConditionalPostDisplay/ClubExclusivePosts/ClubExclusivePosts'

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
            <LinkButton w='100%' size='md' colorScheme='gray' href={`/${data.club.slug}`}>
              <Trans>
                View Club
              </Trans>
            </LinkButton>
          </Stack>
        </LargeBackgroundBox>
      </Box>
      <Box>
        <ClubExclusivePosts query={data.club} />
        <Text fontSize='sm' color='gray.200'>
          <Trans>
            As a supporter, you have access to all exclusive content from this club.
          </Trans>
        </Text>
      </Box>
      <ManageCancelledSubscriptionButton query={data} />
    </Stack>
  )
}
