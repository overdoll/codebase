import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SearchSmall } from '@//:assets/icons/navigation'
import { useHistoryDisclosure } from '@//:modules/hooks'
import SearchBody from './components/SearchBody/SearchBody'
import HistoryDisclosureProvider
  from '@//:modules/content/HookedComponents/HistoryDisclosure/components/HistoryDisclosureProvider/HistoryDisclosureProvider'
import { useRef } from 'react'
import SmallGenericButton from '../../GenericButtons/SmallGenericButton/SmallGenericButton'

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
      <SmallGenericButton
        onClick={onOpen}
        isIcon
        icon={SearchSmall}
      >
        {i18n._(t`Open Search`)}
      </SmallGenericButton>
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
