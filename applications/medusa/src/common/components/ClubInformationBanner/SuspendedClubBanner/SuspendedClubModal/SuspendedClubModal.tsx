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
import { SuspendedClubModalFragment$key } from '@//:artifacts/SuspendedClubModalFragment.graphql'
import { Trans } from '@lingui/macro'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useCountdown } from '@//:modules/hooks'
import UnSuspendClubForm from './UnSuspendClubForm/UnSuspendClubForm'
import LinkInline from '@//:modules/content/ContentHints/LinkInline/LinkInline'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'

interface Props {
  query: SuspendedClubModalFragment$key
  isOpen: boolean
  onClose: () => void
}

const Fragment = graphql`
  fragment SuspendedClubModalFragment on Club {
    ...UnSuspendClubFormFragment
    suspension @required(action: THROW) {
      expires
    }
  }
`

export default function SuspendedClubModal ({
  query,
  isOpen,
  onClose
}: Props): JSX.Element | null {
  const data = useFragment(Fragment, query)

  const {
    countdown,
    hasPassed,
    remaining
  } = useCountdown(data.suspension?.expires)

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
                ? <Trans>Club Locked</Trans>
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
                  <LinkInline isExternal color='green.300' href={CLUB_GUIDELINES} fontSize='md'>
                    <Trans>
                      Club Guidelines
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
                    You may unlock your club after agreeing to the community guidelines.
                  </Trans>
                  )
                : (
                  <Trans>
                    Your club has been locked and you'll have the ability to unlock it after
                  </Trans>
                  )}
            </Text>
            {hasPassed
              ? <UnSuspendClubForm query={data} />
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
