import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AccountActiveClubSupporterSubscriptionPreviewFragment$key
} from '@//:artifacts/AccountActiveClubSupporterSubscriptionPreviewFragment.graphql'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { HStack } from '@chakra-ui/react'
import { LinkTile, StackTile } from '@//:modules/content/ContentSelection'
import AccountActiveClubSupporterSubscriptionDetails
  from '../../../../../components/AccountActiveClubSupporterSubscriptionDetails/AccountActiveClubSupporterSubscriptionDetails'
import { ArrowButtonRight, WarningTriangle } from '@//:assets/icons'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'

interface Props {
  query: AccountActiveClubSupporterSubscriptionPreviewFragment$key
}

const Fragment = graphql`
  fragment AccountActiveClubSupporterSubscriptionPreviewFragment on AccountActiveClubSupporterSubscription {
    reference
    ...AccountActiveClubSupporterSubscriptionDetailsFragment
  }
`

export default function AccountActiveClubSupporterSubscriptionPreview ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <LinkTile to={`/settings/billing/subscription/${data.reference}`}>
      <StackTile>
        <LargeBackgroundBox w='100%'>
          <HStack spacing={4} justify='space-between' align='center'>
            <AccountActiveClubSupporterSubscriptionDetails query={data} />
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
