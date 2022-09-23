import { Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useQueryParam } from 'use-query-params'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { WarningTriangle } from '@//:assets/icons'
import Icon from '../../../../modules/content/PageLayout/BuildingBlocks/Icon/Icon'

export default function SafeModal (): JSX.Element {
  const [safe, setSafe] = useQueryParam<boolean | null | undefined>('safe')

  const {
    isOpen,
    onClose
  } = useDisclosure({ defaultIsOpen: safe != null })

  const closeModal = (): void => {
    setSafe(undefined)
    onClose()
  }

  return (
    <Modal
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={closeModal}
      isCentered
      size='lg'
      motionPreset='none'
    >
      <ModalOverlay
        bg='dimmers.900'
        backdropFilter='auto'
        backdropBlur='50px'
      />
      <ModalContent>
        <ModalBody my={3}>
          <Stack spacing={3}>
            <Icon
              mb={4}
              icon={WarningTriangle}
              w={12}
              h={12}
              fill='orange.300'
            />
            <Text fontSize='lg' color='gray.100'>
              <Trans>
                Hello!
              </Trans>
            </Text>
            <Text fontSize='lg' color='gray.100'>
              <Trans>
                You're seeing this message because you clicked on the website link through a social platform where we
                wouldn't want you to be surprised by the content you see.
              </Trans>
            </Text>
            <Text fontSize='lg' color='gray.100'>
              <Trans>
                overdoll is a platform that contains digital adult content and so after closing the modal, you will see
                this content. Please confirm that you're okay with seeing digital adult content.
              </Trans>
            </Text>
            <Button size='lg' colorScheme='orange' onClick={closeModal}>
              <Trans>
                I'm okay with digital adult content
              </Trans>
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
