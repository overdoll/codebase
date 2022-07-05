import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type {
  DeleteSavedPaymentMethodButtonFragment$key
} from '@//:artifacts/DeleteSavedPaymentMethodButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { DeleteSavedPaymentMethodButtonMutation } from '@//:artifacts/DeleteSavedPaymentMethodButtonMutation.graphql'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Alert, AlertDescription, AlertIcon, useToast } from '@//:modules/content/ThemeComponents'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { DeleteBin } from '@//:assets/icons'
import PaymentMethod from '../../PaymentMethod/PaymentMethod'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  query: DeleteSavedPaymentMethodButtonFragment$key
}

const Fragment = graphql`
  fragment DeleteSavedPaymentMethodButtonFragment on AccountSavedPaymentMethod {
    id
    paymentMethod {
      ...PaymentMethodFragment
    }
  }
`

const Mutation = graphql`
  mutation DeleteSavedPaymentMethodButtonMutation($input: DeleteAccountSavedPaymentMethodInput!, $connections: [ID!]!) {
    deleteAccountSavedPaymentMethod(input: $input) {
      deletedAccountSavedPaymentMethodId @deleteEdge(connections: $connections)
    }
  }
`

export default function DeleteSavedPaymentMethodButton ({
  query,
  connectionId
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<DeleteSavedPaymentMethodButtonMutation>(Mutation)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          savedPaymentMethodId: data.id
        },
        connections: [connectionId]
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Payment method successfully deleted`
        })
        onClose()
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error deleting your payment method`
        })
      }
    })
  }

  return (
    <>
      <MenuItem
        onClick={onOpen}
        icon={DeleteBin}
        text={(
          <Trans>
            Delete Payment Method
          </Trans>)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Delete Saved Payment Method
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <Stack spacing={2}>
              <Alert
                status='info'
              >
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    Deleting a saved payment method does not cancel any associated subscriptions. If you'd like to
                    cancel your subscription,
                    you can do this from the My Subscriptions page.
                  </Trans>
                </AlertDescription>
              </Alert>
              <Text fontSize='md' color='gray.00'>
                <Trans>
                  Are you sure you would like to delete this payment method? You won't be able to use it to support
                  another club and will have to re-enter your payment information the next time you subscribe.
                </Trans>
              </Text>
              <LargeBackgroundBox bg='gray.900' w='100%'>
                <PaymentMethod query={data.paymentMethod} />
              </LargeBackgroundBox>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onSubmit}
              size='lg'
              w='100%'
              colorScheme='orange'
              isLoading={isInFlight}
            >
              <Trans>
                Delete Saved Payment Method
              </Trans>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
