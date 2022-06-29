import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SearchSmall } from '@//:assets/icons/navigation'
import { Icon } from '@//:modules/content/PageLayout'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useHistoryDisclosure } from '@//:modules/hooks'
import SearchBody from './components/SearchBody/SearchBody'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import { useRef } from 'react'

export default function SearchButton (): JSX.Element {
  const methods = useHistoryDisclosure({ hash: 'search' })
  const {
    isOpen,
    onOpen,
    onClose
  } = methods

  const { i18n } = useLingui()

  const closeButtonRef = useRef(null)

  return (
    <>
      <IconButton
        aria-label={i18n._(t`Open Search`)}
        onClick={onOpen}
        colorScheme='gray'
        size='sm'
        borderRadius='md'
        icon={<Icon fill='gray.100' w={4} h={4} icon={SearchSmall} />}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{
          base: 'full',
          md: '6xl'
        }}
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
        initialFocusRef={closeButtonRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody overflowX='hidden' px={2}>
            <HistoryDisclosureProvider {...methods}>
              <SearchBody closeButtonRef={closeButtonRef} />
            </HistoryDisclosureProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
