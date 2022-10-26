import type { SavedPaymentMethodFragment$key } from '@//:artifacts/SavedPaymentMethodFragment.graphql'
import type { SavedPaymentMethodViewerFragment$key } from '@//:artifacts/SavedPaymentMethodViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import BillingSummary from '../BillingSummary/BillingSummary'
import { Stack } from '@chakra-ui/react'
import CCBillSelectSavedPaymentForm from './CCBillSelectSavedPaymentForm/CCBillSelectSavedPaymentForm'
import FeatureSupportSummary from '../FeatureSupportSummary/FeatureSupportSummary'

interface Props {
  clubQuery: SavedPaymentMethodFragment$key
  viewerQuery: SavedPaymentMethodViewerFragment$key
}

const ClubFragment = graphql`
  fragment SavedPaymentMethodFragment on Club {
    ...FeatureSupportSummaryFragment
    ...BillingSummaryFragment
    ...CCBillSelectSavedPaymentFormFragment
  }
`

const ViewerFragment = graphql`
  fragment SavedPaymentMethodViewerFragment on Account {
    ...CCBillSelectSavedPaymentFormViewerFragment
  }
`

export default function SavedPaymentMethod (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <Stack spacing={8}>
      <FeatureSupportSummary query={clubData} />
      <BillingSummary query={clubData} />
      <CCBillSelectSavedPaymentForm
        viewerQuery={viewerData}
        query={clubData}
      />
    </Stack>
  )
}
