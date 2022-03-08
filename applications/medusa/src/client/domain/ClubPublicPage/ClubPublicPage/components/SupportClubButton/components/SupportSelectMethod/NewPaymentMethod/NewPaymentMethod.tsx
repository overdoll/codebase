import type { NewPaymentMethodFragment$key } from '@//:artifacts/NewPaymentMethodFragment.graphql'
import type { NewPaymentMethodViewerFragment$key } from '@//:artifacts/NewPaymentMethodViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ChooseCurrency from '../../ChooseCurrency/ChooseCurrency'
import BillingSummary from '../../BillingSummary/BillingSummary'
import CCBillSubscribeForm from './CCBillSubscribeForm/CCBillSubscribeForm'
import { useRef, useState } from 'react'
import CCBillWindowListener from './CCBillWindowListener/CCBillWindowListener'
import { Stack } from '@chakra-ui/react'

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
  }
`

export default function NewPaymentMethod ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const [originLink, updateOriginLink] = useState<string | null>(null)
  const windowReference = useRef<Window | null>(null)
  const [currency, setCurrency] = useState(clubData.supporterSubscriptionPrice.localizedPrice.currency)

  if (originLink != null && windowReference != null) {
    return (
      <CCBillWindowListener
        windowReference={windowReference}
        originLink={originLink}
        updateOriginLink={updateOriginLink}
      />
    )
  }

  return (
    <Stack spacing={8}>
      <ChooseCurrency query={clubData} onChange={setCurrency} defaultValue={currency} />
      <BillingSummary query={clubData} currency={currency} />
      <CCBillSubscribeForm
        updateOriginLink={updateOriginLink}
        windowReference={windowReference}
        query={clubData}
        currency={currency}
      />
    </Stack>
  )
}
