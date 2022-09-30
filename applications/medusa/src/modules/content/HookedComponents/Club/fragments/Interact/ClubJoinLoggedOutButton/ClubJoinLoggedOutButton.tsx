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
import encodeJoinRedirect from '../../../../../../support/encodeJoinRedirect'
import { graphql, useFragment } from 'react-relay'
import { ClubJoinLoggedOutButtonFragment$key } from '@//:artifacts/ClubJoinLoggedOutButtonFragment.graphql'
import LinkButton from '../../../../../ThemeComponents/LinkButton/LinkButton'
import { Icon } from '../../../../../PageLayout'

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

  const redirect = encodeJoinRedirect({
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
              <Icon icon={PlusCircle} w={12} h={12} fill='green.400' />
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
              <LinkButton
                leftIcon={<Icon icon={LoginKeys} w={5} h={5} fill='green.900' />}
                w='100%'
                size='lg'
                colorScheme='green'
                href={redirect}
              >
                <Trans>
                  Join
                </Trans>
              </LinkButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
