import type { NewPaymentMethodFragment$key } from '@//:artifacts/NewPaymentMethodFragment.graphql'
import type { NewPaymentMethodViewerFragment$key } from '@//:artifacts/NewPaymentMethodViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ChooseCurrency from '../../ChooseCurrency/ChooseCurrency'
import BillingSummary from '../../BillingSummary/BillingSummary'
import CCBillSubscribeForm from './CCBillSubscribeForm/CCBillSubscribeForm'

interface Props {
  clubQuery: NewPaymentMethodFragment$key
  viewerQuery: NewPaymentMethodViewerFragment$key
}

const ClubFragment = graphql`
  fragment NewPaymentMethodFragment on Club {
    supporterSubscriptionPrice {
      localizedPrice {
        currency
      }
    }
    ...ChooseCurrencyFragment
    ...BillingSummaryFragment
    ...CCBillSubscribeFormFragment
  }
`

const ViewerFragment = graphql`
  fragment NewPaymentMethodViewerFragment on Account {
    __typename
    savedPaymentMethods {
      edges {
        node {
          __typename
        }
      }
    }
  }
`

export default function NewPaymentMethod ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <ChooseCurrency query={clubData} defaultValue={clubData.supporterSubscriptionPrice.localizedPrice.currency}>
      {({ currency }) => (
        <>
          <BillingSummary query={clubData} currency={currency} />
          <CCBillSubscribeForm query={clubData} currency={currency} />
        </>
      )}
    </ChooseCurrency>
  )
}
