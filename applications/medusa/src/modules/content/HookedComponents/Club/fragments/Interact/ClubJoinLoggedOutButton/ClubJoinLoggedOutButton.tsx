import { LoginKeys, PlusCircle } from '@//:assets/icons'
import {
  Box,
  ButtonProps,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { useLingui } from '@lingui/react'
import CloseButton from '../../../../../ThemeComponents/CloseButton/CloseButton'
import { graphql, useFragment } from 'react-relay'
import { ClubJoinLoggedOutButtonFragment$key } from '@//:artifacts/ClubJoinLoggedOutButtonFragment.graphql'
import { Icon } from '../../../../../PageLayout'
import { useJoin } from '@//:domain/app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import Button from '../../../../../../form/Button/Button'

interface Props extends ButtonProps {
  clubQuery: ClubJoinLoggedOutButtonFragment$key
}

const PostFragment = graphql`
  fragment ClubJoinLoggedOutButtonFragment on Club {
    slug
    name
  }
`

export default function ClubJoinLoggedOutButton (props: Props): JSX.Element {
  const { clubQuery } = props

  const clubData = useFragment(PostFragment, clubQuery)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const { i18n } = useLingui()

  const onOpenJoin = (): void => {
    onOpen()
  }

  const onJoin = useJoin({
    pathname: '/[slug]',
    query: {
      slug: clubData.slug
    }
  }, 'club_join_button')

  return (
    <>
      <MediumGenericButton colorScheme='green' onClick={onOpenJoin} icon={PlusCircle}>
        {i18n._(t`Join`)}
      </MediumGenericButton>
      <Modal
        isCentered
        size={{
          base: 'sm',
          md: 'lg'
        }}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody my={3}>
            <Stack justify='center' align='center' spacing={6}>
              <Icon icon={PlusCircle} w={12} h={12} fill='green.300' />
              <Box>
                <Heading color='gray.00' fontSize='lg'>
                  <Trans>
                    Join this club
                  </Trans>
                </Heading>
                <Text fontSize='md' color='gray.100'>
                  <Trans>
                    Join overdoll to get updates when {clubData.name} makes a new post
                  </Trans>
                </Text>
              </Box>
              <Button
                leftIcon={<Icon icon={LoginKeys} w={5} h={5} fill='green.900' />}
                w='100%'
                size='lg'
                colorScheme='green'
                onClick={onJoin}
              >
                <Trans>
                  Join
                </Trans>
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
