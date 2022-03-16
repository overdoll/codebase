import type { SavedPaymentMethodFragment$key } from '@//:artifacts/SavedPaymentMethodFragment.graphql'
import type { SavedPaymentMethodViewerFragment$key } from '@//:artifacts/SavedPaymentMethodViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ChooseCurrency from '../../ChooseCurrency/ChooseCurrency'
import BillingSummary from '../../BillingSummary/BillingSummary'
import { Suspense } from 'react'
import { HStack, Stack } from '@chakra-ui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import CCBillDisplayTransaction from '../CCBillDisplayTransaction/CCBillDisplayTransaction'
import CCBillSelectSavedPaymentForm from './CCBillSelectSavedPaymentForm/CCBillSelectSavedPaymentForm'
import ClosePaymentModalButton from '../../ClosePaymentModalButton/ClosePaymentModalButton'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'

interface Props {
  clubQuery: SavedPaymentMethodFragment$key
  viewerQuery: SavedPaymentMethodViewerFragment$key
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

interface SearchProps {
  token: string | null
}

export default function SavedPaymentMethod ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)
  const { onClose } = useHistoryDisclosureContext()

  const {
    searchArguments,
    setArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: null
    }
  })

  if (searchArguments.variables.token != null) {
    return (
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <CCBillDisplayTransaction
            onClose={onClose as () => void}
            loadQuery={loadQuery}
            searchArguments={searchArguments}
          />
        </Suspense>
      </QueryErrorBoundary>
    )
  }

  return (
    <Stack spacing={8}>
      <HStack spacing={2} justify='space-between'>
        <ChooseCurrency query={clubData} />
        <ClosePaymentModalButton query={viewerData} />
      </HStack>
      <BillingSummary query={clubData} />
      <CCBillSelectSavedPaymentForm
        viewerQuery={viewerData}
        query={clubData}
        setArguments={setArguments}
      />
    </Stack>
  )
}
