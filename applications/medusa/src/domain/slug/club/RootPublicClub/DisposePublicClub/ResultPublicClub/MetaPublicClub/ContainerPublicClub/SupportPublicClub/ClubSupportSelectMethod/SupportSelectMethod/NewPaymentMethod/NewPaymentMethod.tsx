import type { NewPaymentMethodFragment$key } from '@//:artifacts/NewPaymentMethodFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import BillingSummary from '../BillingSummary/BillingSummary'
import CCBillSubscribeForm from './CCBillSubscribeForm/CCBillSubscribeForm'
import { useRef, useState } from 'react'
import CCBillWindowListener from './CCBillWindowListener/CCBillWindowListener'
import { Stack } from '@chakra-ui/react'
import FeatureSupportSummary from '../FeatureSupportSummary/FeatureSupportSummary'

interface Props {
  clubQuery: NewPaymentMethodFragment$key
}

const ClubFragment = graphql`
  fragment NewPaymentMethodFragment on Club {
    ...FeatureSupportSummaryFragment
    ...BillingSummaryFragment
    ...CCBillSubscribeFormFragment
  }
`

export default function NewPaymentMethod (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

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
      <FeatureSupportSummary query={clubData} />
      <BillingSummary query={clubData} />
      <CCBillSubscribeForm
        updateOriginLink={updateOriginLink}
        windowReference={windowReference}
        query={clubData}
      />
    </Stack>
  )
}
