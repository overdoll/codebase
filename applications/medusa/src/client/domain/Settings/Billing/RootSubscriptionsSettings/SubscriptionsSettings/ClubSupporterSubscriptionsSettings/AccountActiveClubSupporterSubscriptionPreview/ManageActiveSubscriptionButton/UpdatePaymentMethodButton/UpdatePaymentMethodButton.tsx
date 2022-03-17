import { graphql, useFragment } from 'react-relay/hooks'
import type { UpdatePaymentMethodButtonFragment$key } from '@//:artifacts/UpdatePaymentMethodButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { PaymentMethodIdentifier } from '@//:assets/icons'
import PaymentMethod from '../../../../../../../../../components/PaymentMethod/PaymentMethod'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import CCBillUpdatePaymentMethodInstructions
  from './CCBillUpdatePaymentMethodInstructions/CCBillUpdatePaymentMethodInstructions'

interface Props {
  query: UpdatePaymentMethodButtonFragment$key
}

const Fragment = graphql`
  fragment UpdatePaymentMethodButtonFragment on AccountActiveClubSupporterSubscription {
    paymentMethod {
      ...PaymentMethodFragment
    }
    ...CCBillUpdatePaymentMethodInstructionsFragment
  }
`

export default function UpdatePaymentMethodButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  return (
    <>
      <MenuItem
        onClick={onOpen}
        icon={PaymentMethodIdentifier}
        text={(
          <Trans>
            Update Payment Method
          </Trans>)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Update Payment Method
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <Stack spacing={6}>
              <SmallBackgroundBox bg='gray.900'>
                <PaymentMethod query={data.paymentMethod} />
              </SmallBackgroundBox>
              <Alert
                status='info'
              >
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    Your payment method cannot be directly updated through our platform. To update
                    your payment method, please follow the steps below to update it through our billing provider's
                    website.
                  </Trans>
                </AlertDescription>
              </Alert>
              <CCBillUpdatePaymentMethodInstructions query={data} />
            </Stack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
