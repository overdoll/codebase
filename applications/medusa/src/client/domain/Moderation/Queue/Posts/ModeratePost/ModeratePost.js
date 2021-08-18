/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect } from 'react'
import type { ModeratePostMutation } from '@//:artifacts/ModeratePostMutation.graphql'
import { graphql, useFragment } from 'react-relay'
import { useMutation } from 'react-relay/hooks'
import {
  HStack,
  CloseButton,
  Flex,
  Heading,
  Fade,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import RejectionReasons from './RejectionReasons/RejectionReasons'
import type { PostContentFragment$key } from '@//:artifacts/PostContentFragment.graphql'
import type { ModeratePostFragment$key } from '@//:artifacts/ModeratePostFragment.graphql'
import Icon from '@//:modules/content/Icon/Icon'
import Close from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/form-validation/close.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import type { PendingPostsFragment$key } from '@//:artifacts/PendingPostsFragment.graphql'
import Button from '@//:modules/form/Button'

type Props = {
  infractions: PostContentFragment$key,
  postID: ModeratePostFragment$key,
  connectionID: PendingPostsFragment$key,
}

const ModeratePostGQL = graphql`
  mutation ModeratePostMutation($input: ModeratePostInput!, $connections: [ID!]!) {
    moderatePost(input: $input) {
      postAuditLog {
        id @deleteEdge(connections: $connections)
      }
    }
  }
`

const PostIDGQL = graphql`
  fragment ModeratePostFragment on Post {
    id
  }
`

export default function ModeratePost (props: Props): Node {
  const [t] = useTranslation('moderation')

  const [moderatePost, isModeratingPost] = useMutation<ModeratePostMutation>(
    ModeratePostGQL
  )

  const data = useFragment(PostIDGQL, props.postID)

  const notify = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  // Close modal if user scrolls to a different post
  useEffect(() => {
    onClose()
  }, [data.id])

  const approvePost = () => {
    moderatePost({
      variables: {
        input: {
          postId: data.id,
          notes: ''
        },
        connections: [props.connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('queue.post.actions.approve.query.success', { id: data.id }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.approve.query.error', { id: data.id }),
          isClosable: true
        })
      }
    })
  }
  const rejectPost = (formData) => {
    moderatePost({
      variables: {
        input: {
          postId: data.id,
          reasonId: formData.rejectionId,
          notes: formData.note
        },
        connections: [props.connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('queue.post.actions.reject.query.success', { id: data.id }),
          isClosable: true
        })
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.reject.query.error', { id: data.id }),
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <HStack p={6} spacing={8} justify='center'>
        <Button
          color='gray.00'
          bg='orange.500'
          borderRadius='100%' size='lg' variant='unstyled' colorScheme='orange' isLoading={isModeratingPost}
          onClick={onOpen} h='85px' w='85px'
        >
          <Flex align='center' direction='column'>
            <Icon
              w={4} mb={1} h={4} icon={Close}
              fill='gray.00'
            />
            {t('queue.post.actions.reject.button')}
          </Flex>
        </Button>
        <Button
          h='85px' w='85px'
          color='gray.00'
          bg='green.500'
          borderRadius='100%' size='lg' variant='unstyled' colorScheme='green' isLoading={isModeratingPost}
          onClick={approvePost}
        >
          <Flex align='center' direction='column'>
            <Icon
              w={4} mb={1} h={4} icon={InterfaceValidationCheck}
              fill='gray.00'
            />
            {t('queue.post.actions.approve.button')}
          </Flex>
        </Button>
      </HStack>
      <Flex
        position='absolute'
        w='100%' h='100%'
        pointerEvents={isOpen ? 'initial' : 'none'}
      >
        <Fade in={isOpen}>
          <Flex
            p={4} direction='column' bg='dimmers.900' w='100%' h='100%' position='absolute'
            borderRadius={10} backdropFilter='blur(5px)'
          >
            <Flex align='center' w='100%' justify='space-between'>
              <Heading fontSize='lg' color='gray.00'>{t('queue.post.actions.reject.modal.title')}</Heading>
              <CloseButton onClick={onClose} right={0} />
            </Flex>
            <RejectionReasons
              infractions={props.infractions}
              onSubmit={rejectPost}
              isModeratingPost={isModeratingPost}
              moderatePost={moderatePost}
            />
          </Flex>
        </Fade>
      </Flex>
    </>
  )
}
