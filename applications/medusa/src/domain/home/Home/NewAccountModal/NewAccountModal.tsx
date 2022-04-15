import { useFragment } from 'react-relay/hooks'
import type { NewAccountModalFragment$key } from '@//:artifacts/NewAccountModalFragment.graphql'
import { graphql } from 'react-relay'
import { useFlash } from '@//:modules/flash'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { Trans } from '@lingui/macro'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props {
  query: NewAccountModalFragment$key | null
}

const Fragment = graphql`
  fragment NewAccountModalFragment on Account {
    id
  }
`

export default function NewAccountModal ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const {
    read,
    flush
  } = useFlash()

  const hasNewAccount = read('new.account')

  useEffect(() => {
    if (hasNewAccount != null) {
      if (data == null) {
        flush('confirmation.error')
        return
      }
      flush('confirmation.error')
      onOpen()
    }
  }, [hasNewAccount, data])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        isCentered
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalHeader>
            <Trans>
              Set Up Your Profile
            </Trans>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <Text color='gray.00' fontSize='md'>
                <Trans>
                  Welcome to overdoll! We're so glad to have you here. On our platform, we strive to make sure you're
                  served content you want to see. Take a few minutes to set up your curation profile to let us know what
                  you like?
                </Trans>
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <LinkButton
              size='lg'
              colorScheme='primary'
              href='/settings/preferences/curation-profile'
            >
              <Trans>
                Set up profile
              </Trans>
            </LinkButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
