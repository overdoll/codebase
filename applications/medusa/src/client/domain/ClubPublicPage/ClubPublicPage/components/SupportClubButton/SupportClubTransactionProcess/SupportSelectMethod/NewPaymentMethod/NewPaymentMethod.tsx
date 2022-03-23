import type { NewPaymentMethodFragment$key } from '@//:artifacts/NewPaymentMethodFragment.graphql'
import type { NewPaymentMethodViewerFragment$key } from '@//:artifacts/NewPaymentMethodViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import ChooseCurrency from '../../../ChooseCurrency/ChooseCurrency'
import BillingSummary from '../../../BillingSummary/BillingSummary'
import CCBillSubscribeForm from './CCBillSubscribeForm/CCBillSubscribeForm'
import { useRef, useState } from 'react'
import CCBillWindowListener from './CCBillWindowListener/CCBillWindowListener'
import { HStack, Stack } from '@chakra-ui/react'
import ClosePaymentModalButton from '../../../ClosePaymentModalButton/ClosePaymentModalButton'

interface Props {
  clubQuery: NewPaymentMethodFragment$key
  viewerQuery: NewPaymentMethodViewerFragment$key
}

const ClubFragment = graphql`
  fragment NewPaymentMethodFragment on Club {
    ...ChooseCurrencyFragment
    ...BillingSummaryFragment
    ...CCBillSubscribeFormFragment
  }
`

const ViewerFragment = graphql`
  fragment NewPaymentMethodViewerFragment on Account {
    ...ClosePaymentModalButtonFragment
  }
`

export default function NewPaymentMethod ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [originLink, updateOriginLink] = useState<string | null>(null)
  const windowReference = useRef<Window | null>(null)

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
      <HStack spacing={2} justify='space-between'>
        <ChooseCurrency query={clubData} />
        <ClosePaymentModalButton query={viewerData} />
      </HStack>
      <BillingSummary query={clubData} />
      <CCBillSubscribeForm
        updateOriginLink={updateOriginLink}
        windowReference={windowReference}
        query={clubData}
      />
    </Stack>
  )
}
