import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountActiveClubSupporterSubscriptionSettingsFragment$key
} from '@//:artifacts/AccountActiveClubSupporterSubscriptionSettingsFragment.graphql'
import { LargeBackgroundBox, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ManageActiveSubscriptionButton from './ManageActiveSubscriptionButton/ManageActiveSubscriptionButton'
import { ConnectionProp } from '@//:types/components'
import AccountActiveClubSupporterSubscriptionDetails
  from '../AccountActiveClubSupporterSubscriptionDetails/AccountActiveClubSupporterSubscriptionDetails'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ClubExclusivePosts
  from '../../../../../../slug/club/RootPublicClub/PublicClub/ClubConditionalPostDisplay/ClubExclusivePosts/ClubExclusivePosts'

interface Props extends ConnectionProp {
  query: AccountActiveClubSupporterSubscriptionSettingsFragment$key
}

const Fragment = graphql`
  fragment AccountActiveClubSupporterSubscriptionSettingsFragment on AccountActiveClubSupporterSubscription {
    club {
      slug
      ...ClubExclusivePostsFragment
    }
    ccbillSubscription {
      ccbillSubscriptionId
    }
    ...AccountActiveClubSupporterSubscriptionDetailsFragment
    ...ManageActiveSubscriptionButtonFragment
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
            <Text fontSize='sm' color='gray.200'>
              <Trans>
                Subscription # {data?.ccbillSubscription?.ccbillSubscriptionId}
              </Trans>
            </Text>
          </Stack>
        </LargeBackgroundBox>
      </Box>
      <Stack>
        <ClubExclusivePosts query={data.club} />
        <Heading fontSize='md' color='gray.200'>
          <Trans>
            As a supporter, you have access to all exclusive content from this club
          </Trans>
        </Heading>
      </Stack>
      <ManageActiveSubscriptionButton connectionId={connectionId} query={data} />
    </Stack>
  )
}
