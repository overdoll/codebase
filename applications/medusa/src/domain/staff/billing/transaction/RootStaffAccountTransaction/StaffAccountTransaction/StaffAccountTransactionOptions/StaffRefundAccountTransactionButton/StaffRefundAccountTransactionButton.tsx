import { graphql, useFragment } from 'react-relay/hooks'
import type {
  StaffRefundAccountTransactionButtonFragment$key
} from '@//:artifacts/StaffRefundAccountTransactionButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { SubscriptionIdentifier } from '@//:assets/icons'
import StaffRefundAccountTransactionForm from './StaffRefundAccountTransaction/StaffRefundAccountTransactionForm'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import LargeAccountHeader from '../../../../../../../../common/components/LargeAccountHeader/LargeAccountHeader'
import PaymentMethod
  from '../../../../../../../settings/billing/payment-methods/RootSavedPaymentMethodsSettings/SavedPaymentMethodsSettings/PaymentMethod/PaymentMethod'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: StaffRefundAccountTransactionButtonFragment$key
}

const Fragment = graphql`
  fragment StaffRefundAccountTransactionButtonFragment on AccountTransaction {
    clubSupporterSubscription {
      ...on IAccountClubSupporterSubscription {
        account {
          ...LargeAccountHeaderFragment
        }
      }
    }
    paymentMethod {
      ...PaymentMethodFragment
    }
    ...StaffRefundAccountTransactionFormFragment
  }
`

export default function StaffRefundAccountTransactionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  return (
    <>
      <MenuItem
        icon={SubscriptionIdentifier}
        onClick={onOpen}
        text={(
          <Trans>
            Refund Transaction
          </Trans>)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size='xl'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Refund Transaction
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody mb={4}>
            <Stack spacing={4}>
              <Alert
                status='warning'
              >
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    Issuing a refund will cancel the original subscription
                  </Trans>
                </AlertDescription>
              </Alert>
              <Stack spacing={1}>
                {data?.clubSupporterSubscription?.account != null && (
                  <LargeAccountHeader query={data?.clubSupporterSubscription?.account} />
                )}
                <SmallBackgroundBox bg='gray.900'>
                  <PaymentMethod query={data.paymentMethod} />
                </SmallBackgroundBox>
              </Stack>
              <StaffRefundAccountTransactionForm onClose={onClose} query={data} />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
