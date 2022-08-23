import { BookmarkFull, BookmarkLarge, LoginKeys } from '@//:assets/icons'
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
import PostFooterButton from '../PostFooterButton/PostFooterButton'
import { useLingui } from '@lingui/react'
import CloseButton from '../../../../../ThemeComponents/CloseButton/CloseButton'
import encodeJoinRedirect from '../../../../../../support/encodeJoinRedirect'
import { graphql, useFragment } from 'react-relay'
import { PostLikeLoggedOutButtonFragment$key } from '@//:artifacts/PostLikeLoggedOutButtonFragment.graphql'
import LinkButton from '../../../../../ThemeComponents/LinkButton/LinkButton'
import { Icon } from '../../../../../PageLayout'

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

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: postData.club.slug,
      reference: postData.reference
    }
  })

  return (
    <>
      <PostFooterButton isIcon onClick={onOpen} icon={BookmarkFull}>
        {i18n._(t`Save`)}
      </PostFooterButton>
      <Modal
        isCentered
        size={{
          base: 'sm',
          md: '2xl'
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
              <Icon icon={BookmarkLarge} w={12} h={12} fill='primary.400' />
              <Box>
                <Heading color='gray.00' fontSize='lg'>
                  <Trans>
                    Save this post to your bookmarks
                  </Trans>
                </Heading>
                <Text fontSize='md' color='gray.100'>
                  <Trans>
                    Join overdoll to save this post and let {postData.club.name} know you like their post
                  </Trans>
                </Text>
              </Box>
              <LinkButton
                leftIcon={<Icon icon={LoginKeys} w={5} h={5} fill='primary.900' />}
                w='100%'
                size='lg'
                colorScheme='primary'
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
