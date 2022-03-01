import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { SearchSmall } from '@//:assets/icons/navigation'
import IconButton from '@//:modules/form/IconButton/IconButton'
import GeneralSearch from './GeneralSearch/GeneralSearch'

interface Props {
  routeTo: string
}

export default function PostSearchButton ({ routeTo }: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const { i18n } = useLingui()

  return (
    <>
      <IconButton
        aria-label={i18n._(t`Open Search`)}
        onClick={onOpen}
        colorScheme='primary'
        size='sm'
        borderRadius='md'
        icon={<Icon fill='primary.900' w={4} h={4} icon={SearchSmall} />}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        motionPreset='none'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <GeneralSearch onClose={onClose} routeTo={routeTo} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
