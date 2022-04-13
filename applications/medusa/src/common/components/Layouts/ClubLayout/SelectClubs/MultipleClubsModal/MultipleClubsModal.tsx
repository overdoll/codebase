import { ClickableBox } from '@//:modules/content/PageLayout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { ReactNode, Suspense } from 'react'
import ClubListSelector from './ClubListSelector/ClubListSelector'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { QueryErrorBoundary, SkeletonStack } from '@//:modules/content/Placeholder'

interface Props {
  children: ReactNode
}

export default function MultipleClubsModal ({
  children
}: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  return (
    <>
      <ClickableBox
        variant='ghost'
        _hover={{ bg: 'gray.900' }}
        _active={{ bg: 'gray.900' }}
        borderRadius='md'
        h='100%'
        onClick={onOpen}
        p={0}
      >
        {children}
      </ClickableBox>
      <Modal
        isCentered
        preserveScrollBarGap
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Trans>
              Switch to club
            </Trans>
          </ModalHeader>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody mb={4}>
            <QueryErrorBoundary loadQuery={() => {
            }}
            >
              <Suspense fallback={<SkeletonStack />}>
                <ClubListSelector onClose={onClose} />
              </Suspense>
            </QueryErrorBoundary>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
