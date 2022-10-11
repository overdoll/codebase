import { HeartFull, HeartOutline, LoginKeys } from '@//:assets/icons'
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
import CloseButton from '../../../../../../../ThemeComponents/CloseButton/CloseButton'
import { graphql, useFragment } from 'react-relay'
import { PostLikeLoggedOutButtonFragment$key } from '@//:artifacts/PostLikeLoggedOutButtonFragment.graphql'
import { Icon } from '../../../../../../../PageLayout'
import { useJoin } from '@//:domain/app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import Button from '../../../../../../../../form/Button/Button'

interface Props extends ButtonProps {
  postQuery: PostLikeLoggedOutButtonFragment$key
}

const PostFragment = graphql`
  fragment PostLikeLoggedOutButtonFragment on Post {
    reference
    club {
      slug
      name
    }
  }
`

export default function PostLikeLoggedOutButton ({
  postQuery
}: Props): JSX.Element {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const postData = useFragment(PostFragment, postQuery)

  const { i18n } = useLingui()

  const onOpenLike = (): void => {
    onOpen()
  }

  const onJoin = useJoin({
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: postData.club.slug,
      reference: postData.reference
    }
  }, 'post_like_button')

  return (
    <>
      <MediumGenericButton isIcon onClick={onOpenLike} icon={HeartOutline}>
        {i18n._(t`Save`)}
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
              <Icon icon={HeartFull} w={12} h={12} fill='primary.400' />
              <Box>
                <Heading color='gray.00' fontSize='lg'>
                  <Trans>
                    Like this post
                  </Trans>
                </Heading>
                <Text fontSize='md' color='gray.100'>
                  <Trans>
                    Join overdoll to let {postData.club.name} know you like their post
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
