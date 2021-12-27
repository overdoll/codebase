import { graphql, useFragment } from 'react-relay/hooks'
import {
  Alert,
  AlertDescription,
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
import CommunityGuidelines from '../../../../components/ContentHints/CommunityGuidelines/CommunityGuidelines'
import { LockedAccountModalFragment$key } from '@//:artifacts/LockedAccountModalFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { formatDistanceStrict, formatDuration, intervalToDuration, isPast } from 'date-fns'
import UnlockAccountForm from './UnlockAccountForm/UnlockAccountForm'
import { useEffect, useState } from 'react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

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

  // TODO add avatar in "jail" in both here and the menu?

  const reasons = {
    POST_INFRACTION: t`The contents of a post you uploaded are not allowed on our platform.`
  }

  const expires = new Date(data.expires as Date)

  const calculateRemainingTime = (): Duration => {
    return intervalToDuration({
      start: expires,
      end: new Date()
    })
  }

  const [timer, setTimer] = useState(calculateRemainingTime())

  const canBeUnlocked = isPast(expires)

  const remainingTime = formatDistanceStrict(expires, new Date())

  const duration = formatDuration(timer)

  useEffect(() => {
    const timerObject = setTimeout(() => {
      setTimer(calculateRemainingTime())
    }, 1000)

    return () => clearTimeout(timerObject)
  })

  return (
    <Modal
      preserveScrollBarGap
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Stack m={5} spacing={4}>
            <Heading
              fontSize='4xl'
              color='gray.00'
            >
              {canBeUnlocked
                ? <Trans>Account Locked</Trans>
                : <Trans>Banned for {remainingTime}</Trans>}
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
              status='warning'
            >
              <AlertDescription>
                {reasons[data.reason] ?? t`No reason was found`}
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
              {canBeUnlocked
                ? <Trans>
                  You may unlock your account after agreeing to the community guidelines.
                </Trans>
                : <Trans>
                  Your account has been locked and you'll have the ability to unlock it after
                </Trans>}
            </Text>
            {canBeUnlocked
              ? <UnlockAccountForm />
              : <SmallBackgroundBox bg='green.50'>
                <Text textAlign='center' color='green.500'>
                  <Trans>
                    {duration}
                  </Trans>
                </Text>
              </SmallBackgroundBox>}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
