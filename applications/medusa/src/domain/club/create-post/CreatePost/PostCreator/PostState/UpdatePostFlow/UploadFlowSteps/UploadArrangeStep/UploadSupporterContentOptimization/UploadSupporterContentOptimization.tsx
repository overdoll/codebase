import { PremiumStar } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import InspectableAlert from '../../../../../../../../../../common/components/InspectableAlert/InspectableAlert'
import { useHistoryDisclosure } from '@//:modules/hooks'
import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'

export default function UploadSupporterContentOptimization (): JSX.Element {
  const {
    isOpen,
    onClose,
    onOpen
  } = useHistoryDisclosure()

  return (
    <>
      <ClickableTile onClick={onOpen}>
        <InspectableAlert
          text={<Trans>Free content should be first</Trans>}
          icon={PremiumStar}
          colorScheme='teal'
        />
      </ClickableTile>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalBody>
            <Stack spacing={2}>
              <Heading fontSize='lg' color='gray.00'>
                <Trans>
                  Supporter content should not be the first slide
                </Trans>
              </Heading>
              <Text fontSize='md' color='gray.100'>
                <Trans>
                  When uploading any kind of supporter content, it's recommended that the first slide in your post is
                  not
                  supporter content and contains either a censored image or a reduced video to encourage your fans to
                  become
                  supporters.
                </Trans>
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              size='lg'
              colorScheme='teal'
            >
              <Trans>
                Got it
              </Trans>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
