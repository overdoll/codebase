import type { SavedPaymentMethodFragment$key } from '@//:artifacts/SavedPaymentMethodFragment.graphql'
import type { SavedPaymentMethodViewerFragment$key } from '@//:artifacts/SavedPaymentMethodViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ChooseCurrency from '../../../ChooseCurrency/ChooseCurrency'
import BillingSummary from '../../../BillingSummary/BillingSummary'
import { HStack, Stack } from '@chakra-ui/react'
import CCBillSelectSavedPaymentForm from './CCBillSelectSavedPaymentForm/CCBillSelectSavedPaymentForm'
import ClosePaymentModalButton from '../../../ClosePaymentModalButton/ClosePaymentModalButton'
import { ForwardedRef } from 'react'

interface Props {
  clubQuery: SavedPaymentMethodFragment$key
  viewerQuery: SavedPaymentMethodViewerFragment$key
  closeButtonRef: ForwardedRef<any>
}

const ClubFragment = graphql`
  fragment SavedPaymentMethodFragment on Club {
    ...ChooseCurrencyFragment
    ...BillingSummaryFragment
    ...CCBillSelectSavedPaymentFormFragment
  }
`

const ViewerFragment = graphql`
  fragment SavedPaymentMethodViewerFragment on Account {
    ...CCBillSelectSavedPaymentFormViewerFragment
    ...ClosePaymentModalButtonFragment
  }
`

export default function SavedPaymentMethod ({
  clubQuery,
  viewerQuery,
  closeButtonRef
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={8}>
      <HStack spacing={2} justify='space-between'>
        <ChooseCurrency query={clubData} />
        <ClosePaymentModalButton
          closeButtonRef={closeButtonRef}
          query={viewerData}
        />
      </HStack>
      <BillingSummary query={clubData} />
      <CCBillSelectSavedPaymentForm
        viewerQuery={viewerData}
        query={clubData}
      />
    </Stack>
  )
}
