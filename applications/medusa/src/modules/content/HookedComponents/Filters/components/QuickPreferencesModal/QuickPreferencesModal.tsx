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
import { graphql, useFragment } from 'react-relay/hooks'
import { QuickPreferencesModalFragment$key } from '@//:artifacts/QuickPreferencesModalFragment.graphql'
import { SkeletonStack } from '../../../../Placeholder'
import QuickUpdateAudiencePreference from './QuickUpdateAudiencePreference/QuickUpdateAudiencePreference'
import { Suspense } from 'react'
import { Icon } from '../../../../PageLayout'
import { MagicBall } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import Button from '../../../../../form/Button/Button'
import { useJoin } from '@//:domain/app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import CloseButton from '../../../../ThemeComponents/CloseButton/CloseButton'

interface Props {
  isOpen: boolean
  onClose: () => void
  query: QuickPreferencesModalFragment$key | null
}

const Fragment = graphql`
  fragment QuickPreferencesModalFragment on Account {
    __typename
  }
`

export default function QuickPreferencesModal (props: Props): JSX.Element {
  const {
    isOpen,
    onClose,
    query
  } = props

  const data = useFragment(Fragment, query)

  const onJoin = useJoin(undefined, 'quick_preferences_modal')

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
          {data == null
            ? (
              <Stack justify='center' align='center' spacing={6}>
                <Icon icon={MagicBall} w={12} h={12} fill='primary.400' />
                <Box>
                  <Heading color='gray.00' fontSize='lg'>
                    <Trans>
                      Filter out content
                    </Trans>
                  </Heading>
                  <Text fontSize='md' color='gray.100'>
                    <Trans>
                      Join overdoll to filter out content you don't want to see
                    </Trans>
                  </Text>
                </Box>
                <Button
                  w='100%'
                  size='lg'
                  colorScheme='primary'
                  onClick={onJoin}
                >
                  <Trans>
                    Join
                  </Trans>
                </Button>
              </Stack>
              )
            : (
              <Suspense fallback={<SkeletonStack />}>
                <QuickUpdateAudiencePreference onClose={onClose} />
              </Suspense>
              )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
