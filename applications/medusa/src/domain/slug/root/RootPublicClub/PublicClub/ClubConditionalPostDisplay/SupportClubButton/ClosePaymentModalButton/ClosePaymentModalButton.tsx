import type { ClosePaymentModalButtonFragment$key } from '@//:artifacts/ClosePaymentModalButtonFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { ForwardedRef, useContext } from 'react'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'

interface Props {
  query: ClosePaymentModalButtonFragment$key
  closeButtonRef: ForwardedRef<any>
}

const Fragment = graphql`
  fragment ClosePaymentModalButtonFragment on Account {
    savedPaymentMethods {
      edges {
        node {
          __typename
        }
      }
    }
  }
`

export default function ClosePaymentModalButton ({
  query,
  closeButtonRef
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { onClose } = useHistoryDisclosureContext()
  const { skipToStep } = useContext(FlowContext)

  const hasSavedPayments = data.savedPaymentMethods != null && data.savedPaymentMethods.edges.length > 0

  const onClick = (): void => {
    if (hasSavedPayments) {
      skipToStep('select_payment')
      return
    }
    onClose?.()
  }

  return (
    <CloseButton ref={closeButtonRef} bg='gray.800' size='lg' onClick={onClick} />
  )
}
