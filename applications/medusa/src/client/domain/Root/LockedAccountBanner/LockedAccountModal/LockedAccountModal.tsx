import { graphql, useFragment } from 'react-relay/hooks'
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
import { Trans } from '@lingui/macro'

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
              <Trans>Banned for {data.expires}</Trans>
            </Heading>
            <Text mb={2}>
              <Trans>
                Looks like you messed up. Something you did here violated our community guidelines. If you keep this up,
                the bans will become longer.
              </Trans>
            </Text>
            <Text>
              <Trans>
                Here's the reason...
              </Trans>
            </Text>
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
              <Text>
                <Trans>
                  Please review the community guidelines to make sure this doesn't happen again.
                </Trans>
              </Text>
              <CommunityGuidelines />
            </Box>
            <Text>
              <Trans>
                Your account has been locked for {data.expires}. You can unlock it after {data.expires}.
              </Trans>
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
