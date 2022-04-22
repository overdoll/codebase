import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountCancelledClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/AccountCancelledClubSupporterSubscriptionPreviewFragment.graphql'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { HStack } from '@chakra-ui/react'
import { LinkTile, StackTile } from '@//:modules/content/ContentSelection'
import AccountCancelledClubSupporterSubscriptionDetails
  from '../../../../../subscription/RootAccountClubSupporterSubscriptionSettings/AccountClubSupporterSubscriptionSettings/AccountCancelledClubSupporterSubscriptionDetails/AccountCancelledClubSupporterSubscriptionDetails'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { ArrowButtonRight } from '@//:assets/icons'

interface Props {
  query: AccountCancelledClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment AccountCancelledClubSupporterSubscriptionPreviewFragment on AccountCancelledClubSupporterSubscription {
    reference
    ...AccountCancelledClubSupporterSubscriptionDetailsFragment
    ...ManageCancelledSubscriptionButtonFragment
  }
`

export default function AccountCancelledClubSupporterSubscriptionPreview ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkTile href={`/settings/billing/subscription/${data.reference}`}>
      <StackTile>
        <LargeBackgroundBox w='100%'>
          <HStack spacing={4} justify='space-between' align='center'>
            <AccountCancelledClubSupporterSubscriptionDetails query={data} />
            <Icon
              icon={ArrowButtonRight}
              w={8}
              h={8}
              fill='gray.500'
            />
          </HStack>
        </LargeBackgroundBox>
      </StackTile>
    </LinkTile>
  )
}
