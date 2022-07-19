import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ClubFooterManageSubscriptionButtonFragment$key
} from '@//:artifacts/ClubFooterManageSubscriptionButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { SubscriptionIdentifier } from '@//:assets/icons'
import ClubFooterButton from '../ClubFooterButton/ClubFooterButton'

interface Props {
  query: ClubFooterManageSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment ClubFooterManageSubscriptionButtonFragment on Club {
    viewerMember {
      isSupporter
      clubSupporterSubscription {
        ...on IAccountClubSupporterSubscription {
          reference
        }
      }
    }
    viewerIsOwner
  }
`

export default function ClubFooterManageSubscriptionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.viewerIsOwner) {
    return <></>
  }

  if (!data?.viewerMember?.isSupporter) {
    return <></>
  }

  const manageSubscriptionLink = {
    pathname: '/settings/billing/subscription/[reference]',
    query: { reference: data.viewerMember?.clubSupporterSubscription?.reference }
  }

  const mySubscriptionsLink = '/settings/billing/subscriptions'

  return (
    <ClubFooterButton
      icon={SubscriptionIdentifier}
      href={data?.viewerMember?.clubSupporterSubscription != null
        ? manageSubscriptionLink
        : mySubscriptionsLink}
    >
      <Trans>
        Manage Subscription
      </Trans>
    </ClubFooterButton>
  )
}
