import { graphql, useFragment } from 'react-relay/hooks'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  AlertDescription,
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react'
import CommunityGuidelines from '../../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { LockedAccountModalFragment$key } from '@//:artifacts/LockedAccountModalFragment.graphql'

interface Props {
  queryRef: LockedAccountModalFragment$key
  isOpen: boolean
  onClose: () => void
}

const LockedAccountModalGQL = graphql`
  fragment LockedAccountModalFragment on AccountLock {
    reason
    expires
  }
`

export default function LockedAccountModal ({
  queryRef,
  isOpen,
  onClose
}: Props): JSX.Element | null {
  const data = useFragment(LockedAccountModalGQL, queryRef)

  const [t] = useTranslation('locked')
  // TODO add avatar in "jail"
  // TODO button for unlocking account is disabled and has countdown timer
  // TODO to unlock account, you have to check "I promise to be better" checkbox

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='5xl'
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        position='relative'
        borderRadius={0}
        bg='gray.800'
      >
        <ModalBody>
          <Stack m={5} spacing={4}>
            <Heading
              fontSize='4xl'
              color='gray.00'
            >
              {t('title', { time: data.expires })}
            </Heading>
            <Text mb={2}>{t('description')}</Text>
            <Text>{t('reason')}</Text>
            <Alert
              mt={4}
              mb={4}
              status='info'
            >
              <AlertDescription>
                {data.reason}
              </AlertDescription>
            </Alert>
            <Box>
              <Text>{t('review')}</Text>
              <CommunityGuidelines />
            </Box>
            <Text>{t('timer', {
              time: data.expires,
              date: data.expires
            })}
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
