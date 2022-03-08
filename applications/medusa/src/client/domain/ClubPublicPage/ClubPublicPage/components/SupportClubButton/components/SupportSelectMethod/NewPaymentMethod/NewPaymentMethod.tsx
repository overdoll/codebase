import type { NewPaymentMethodFragment$key } from '@//:artifacts/NewPaymentMethodFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ChooseCurrency from '../../ChooseCurrency/ChooseCurrency'
import BillingSummary from '../../BillingSummary/BillingSummary'
import CCBillSubscribeForm from './CCBillSubscribeForm/CCBillSubscribeForm'
import { Suspense, useRef, useState } from 'react'
import CCBillWindowListener from './CCBillWindowListener/CCBillWindowListener'
import { HStack, Stack } from '@chakra-ui/react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import QueryErrorBoundary
  from '../../../../../../../../../modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import CCBillDisplayTransaction from '../CCBillDisplayTransaction/CCBillDisplayTransaction'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'

interface Props {
  clubQuery: NewPaymentMethodFragment$key
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

interface SearchProps {
  token: string | null
}

export default function NewPaymentMethod ({
  clubQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const { onClose } = useHistoryDisclosureContext()

  const [originLink, updateOriginLink] = useState<string | null>(null)
  const windowReference = useRef<Window | null>(null)
  const [currency, setCurrency] = useState(clubData.supporterSubscriptionPrice.localizedPrice.currency)

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
          <CCBillDisplayTransaction loadQuery={loadQuery} searchArguments={searchArguments} />
        </Suspense>
      </QueryErrorBoundary>
    )
  }

  if (originLink != null && windowReference != null) {
    return (
      <CCBillWindowListener
        windowReference={windowReference}
        originLink={originLink}
        updateOriginLink={updateOriginLink}
        setArguments={setArguments}
      />
    )
  }

  return (
    <Stack spacing={8}>
      <HStack spacing={2} justify='space-between'>
        <ChooseCurrency query={clubData} onChange={setCurrency} defaultValue={currency} />
        <CloseButton size='sm' onClick={onClose} />
      </HStack>
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
