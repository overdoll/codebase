import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminRefundAccountTransactionButtonFragment$key
} from '@//:artifacts/AdminRefundAccountTransactionButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { SubscriptionIdentifier } from '@//:assets/icons'
import AdminRefundAccountTransactionForm from './AdminRefundAccountTransaction/AdminRefundAccountTransactionForm'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'

interface Props {
  query: AdminRefundAccountTransactionButtonFragment$key
}

const Fragment = graphql`
  fragment AdminRefundAccountTransactionButtonFragment on AccountTransaction {
    ...AdminRefundAccountTransactionFormFragment
  }
`

export default function AdminRefundAccountTransactionButton ({ query }: Props): JSX.Element {
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
        motionPreset='none'
        isCentered
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
              <AdminRefundAccountTransactionForm query={data} />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
