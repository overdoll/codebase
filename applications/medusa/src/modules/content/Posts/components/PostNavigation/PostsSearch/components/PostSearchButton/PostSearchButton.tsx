import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useHistoryDisclosure } from '../../../../../../../hooks'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Icon } from '../../../../../../PageLayout'
import { SearchSmall } from '@//:assets/icons/navigation'
import IconButton from '../../../../../../../form/IconButton/IconButton'
import GeneralSearch from './GeneralSearch/GeneralSearch'
import { UrlObject } from 'url'

interface Props {
  routeTo: string | UrlObject
}

export default function PostSearchButton ({ routeTo }: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure({ hash: 'search' })

  const { i18n } = useLingui()

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
