import { graphql, useFragment } from 'react-relay/hooks'
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
import { LockedAccountModalFragment$key } from '@//:artifacts/LockedAccountModalFragment.graphql'
import { Trans } from '@lingui/macro'
import UnlockAccountForm from './UnlockAccountForm/UnlockAccountForm'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useCountdown } from '@//:modules/hooks'
import LinkInline from '@//:modules/content/ContentHints/LinkInline/LinkInline'
import { COMMUNITY_GUIDELINES } from '@//:modules/constants/links'

interface Props {
  queryRef: LockedAccountModalFragment$key
  isOpen: boolean
  onClose: () => void
}

const LockedAccountModalGQL = graphql`
  fragment LockedAccountModalFragment on Account {
    ...UnlockAccountFormFragment
    lock @required(action: THROW) {
      expires
    }
  }
`

export default function LockedAccountModal ({
  queryRef,
  isOpen,
  onClose
}: Props): JSX.Element {
  const data = useFragment(LockedAccountModalGQL, queryRef)

  const {
    countdown,
    hasPassed,
    remaining
  } = useCountdown(data.lock?.expires)

  return (
    <Modal
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size='lg'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          size='lg'
          as={CloseButton}
        />
        <ModalBody>
          <Stack m={5} spacing={4}>
            <Heading
              fontSize='2xl'
              color='gray.00'
            >
              {hasPassed
                ? <Trans>Account Locked</Trans>
                : <Trans>Locked for {remaining}</Trans>}
            </Heading>
            <Text mb={2}>
              <Trans>
                Looks like you messed up. Something you did here violated our community guidelines. If you keep this up,
                the bans will become longer.
              </Trans>
            </Text>
            <Box>
              <Text fontSize='md'>
                <Trans>
                  Please review the{' '}
                  <LinkInline
                    isExternal
                    color='green.400'
                    href={COMMUNITY_GUIDELINES}
                    fontSize='md'
                  >
                    <Trans>
                      Community Guidelines
                    </Trans>
                  </LinkInline>{' '}
                  to make sure this doesn't happen again.
                </Trans>
              </Text>

            </Box>
            <Text>
              {hasPassed
                ? (
                  <Trans>
                    You may unlock your account after agreeing to the community guidelines.
                  </Trans>
                  )
                : (
                  <Trans>
                    Your account has been locked and you'll have the ability to unlock it after
                  </Trans>
                  )}
            </Text>
            {hasPassed
              ? <UnlockAccountForm queryRef={data} />
              : (
                <SmallBackgroundBox bg='green.50'>
                  <Text textAlign='center' color='green.500'>
                    <Trans>
                      {countdown}
                    </Trans>
                  </Text>
                </SmallBackgroundBox>
                )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
