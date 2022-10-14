import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { ActionUnlock } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import LinkButton from '../../../../ThemeComponents/LinkButton/LinkButton'
import SupporterPlatformFeatureSummary from '../SupporterPlatformFeatureSummary/SupporterPlatformFeatureSummary'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function SupporterFeatureModal (props: Props): JSX.Element {
  const {
    isOpen,
    onClose
  } = props

  return (
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
        <ModalCloseButton
          size='lg'
          as={CloseButton}
        />
        <ModalBody p={4}>
          <Stack pointerEvents='none' justify='center' align='center' position='relative' spacing={6}>
            <Icon icon={ActionUnlock} w={12} h={12} fill='orange.300' />
            <Box>
              <Heading color='gray.00' fontSize='lg'>
                <Trans>
                  Unlock this feature
                </Trans>
              </Heading>
              <Text fontSize='md' color='gray.100'>
                <Trans>
                  Become a supporter of any club and unlock these platform features
                </Trans>
              </Text>
            </Box>
            <SupporterPlatformFeatureSummary />
            <LinkButton
              w='100%'
              size='lg'
              colorScheme='orange'
              href='/supporter'
              pointerEvents='auto'
            >
              <Trans>
                Become a Supporter
              </Trans>
            </LinkButton>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
