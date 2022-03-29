import { graphql, useFragment } from 'react-relay/hooks'
import type { AdminSyncSubscriptionButtonFragment$key } from '@//:artifacts/AdminSyncSubscriptionButtonFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useHistoryDisclosure } from '@//:modules/hooks'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { MenuItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { ArrowButtonRefresh } from '@//:assets/icons'
import useSearch from '@//:modules/content/HookedComponents/Search/hooks/useSearch'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import AdminCCBillSubscriptionDetails from './AdminCCBillSubscriptionDetails/AdminCCBillSubscriptionDetails'
import { Suspense } from 'react'
import { QueryErrorBoundary } from '@//:modules/content/Placeholder'

interface Props {
  query: AdminSyncSubscriptionButtonFragment$key
}

const Fragment = graphql`
  fragment AdminSyncSubscriptionButtonFragment on IAccountClubSupporterSubscription {
    ccbillSubscription @required(action: THROW) {
      ccbillSubscriptionId @required(action: THROW)
    }
  }
`

export default function AdminSyncSubscriptionButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const {
    loadQuery,
    searchArguments
  } = useSearch<{}>({
    defaultValue: {
      id: data.ccbillSubscription.ccbillSubscriptionId
    }
  })

  return (
    <>
      <MenuItem
        icon={ArrowButtonRefresh}
        onClick={onOpen}
        text={(
          <Trans>
            Sync Subscription
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
              Sync Subscription
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody>
            <QueryErrorBoundary loadQuery={loadQuery}>
              <Suspense fallback={<SkeletonStack />}>
                <AdminCCBillSubscriptionDetails searchArguments={searchArguments} />
              </Suspense>
            </QueryErrorBoundary>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              size='lg'
              w='100%'
              colorScheme='orange'
            >
              <Trans>
                Close
              </Trans>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
