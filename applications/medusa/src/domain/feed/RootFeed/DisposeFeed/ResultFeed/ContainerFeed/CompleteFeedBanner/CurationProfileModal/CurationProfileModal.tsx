import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { UseDisclosureReturn } from '@chakra-ui/hooks/dist/declarations/src/use-disclosure'
import { Suspense } from 'react'
import { QueryErrorBoundary, SkeletonStack } from '@//:modules/content/Placeholder'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import LazyCurationProfile from './LazyCurationProfile/LazyCurationProfile'

interface Props extends Pick<UseDisclosureReturn, 'isOpen' | 'onClose'> {
}

export function CurationProfileModal (props: Props): JSX.Element {
  const {
    isOpen,
    onClose
  } = props

  const {
    loadQuery,
    searchArguments
  } = useSearch<{}>({})

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
      isCentered
      scrollBehavior='inside'
      closeOnOverlayClick={false}
      closeOnEsc={false}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={4}>
          <QueryErrorBoundary loadQuery={loadQuery}>
            <Suspense fallback={<SkeletonStack />}>
              <LazyCurationProfile onClose={onClose} searchArguments={searchArguments} />
            </Suspense>
          </QueryErrorBoundary>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
