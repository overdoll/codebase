/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect } from 'react'
import type { ModeratePostApproveMutation } from '@//:artifacts/ModeratePostApproveMutation.graphql'
import type { ModeratePostRejectMutation } from '@//:artifacts/ModeratePostRejectMutation.graphql'

import { graphql, useFragment } from 'react-relay'
import { useMutation } from 'react-relay/hooks'
import {
  HStack,
  CloseButton,
  Flex,
  Heading,
  Fade,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import RejectionReasons from './RejectionReasons/RejectionReasons'
import type { PostContentFragment$key } from '@//:artifacts/PostContentFragment.graphql'
import type { ModeratePostFragment$key } from '@//:artifacts/ModeratePostFragment.graphql'
import type { PendingPostsFragment$key } from '@//:artifacts/PendingPostsFragment.graphql'
import Button from '@//:modules/form/Button'

type Props = {
  infractions: PostContentFragment$key,
  postID: ModeratePostFragment$key,
  connectionID: PendingPostsFragment$key,
}

const ModeratePostApproveGQL = graphql`
  mutation ModeratePostApproveMutation($input: ApprovePostInput!, $connections: [ID!]!) {
    approvePost(input: $input) {
      postAuditLog {
        id
        post {
          id @deleteEdge(connections: $connections)
        }
      }
    }
  }
`

const ModeratePostRejectGQL = graphql`
  mutation ModeratePostRejectMutation($input: RejectPostInput!, $connections: [ID!]!) {
    rejectPost(input: $input) {
      postAuditLog {
        id
        post {
          id @deleteEdge(connections: $connections)
        }
      }
    }
  }
`

const PostIDGQL = graphql`
  fragment ModeratePostFragment on Post {
    id
    brand {
      name
    }
  }
`

export default function ModeratePost (props: Props): Node {
  const [approvePost, isApprovingPost] = useMutation<ModeratePostApproveMutation>(
    ModeratePostApproveGQL
  )

  const [rejectPost, isRejectingPost] = useMutation<ModeratePostRejectMutation>(
    ModeratePostRejectGQL
  )

  const data = useFragment(PostIDGQL, props.postID)

  const [t] = useTranslation('moderation')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const notify = useToast()

  const onApprovePost = () => {
    approvePost({
      variables: {
        input: {
          postId: data.id
        },
        connections: [props.connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('queue.post.actions.approve.query.success', { brand: data.brand.name }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.approve.query.error', { brand: data.brand.name }),
          isClosable: true
        })
      }
    })
  }
  const onRejectPost = (formData) => {
    rejectPost({
      variables: {
        input: {
          postId: data.id,
          postRejectionReasonId: formData.rejectionId,
          notes: formData.note
        },
        connections: [props.connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('queue.post.actions.reject.query.success', { brand: data.brand.name }),
          isClosable: true
        })
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.reject.query.error', { brand: data.brand.name }),
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <HStack spacing={4}>
        <Button size='md' isDisabled={isApprovingPost} onClick={onOpen} colorScheme='orange' variant='solid'>
          {t('queue.post.actions.reject.button')}
        </Button>
        <Button size='md' isLoading={isApprovingPost} onClick={onApprovePost} colorScheme='green' variant='solid'>
          {t('queue.post.actions.approve.button')}
        </Button>
      </HStack>
      <Flex
        position='absolute'
        w='100%' h='100%'
        top={0}
        left={0}
        pointerEvents={isOpen ? 'initial' : 'none'}
      >
        <Fade style={{ zIndex: 2 }} in={isOpen}>
          <Flex
            p={4} direction='column' bg='dimmers.900' w='100%' h='100%' position='absolute'
            borderRadius={10} backdropFilter='blur(5px)'
          >
            <Flex align='center' w='100%' justify='space-between'>
              <Text fontSize='md' color='gray.100'>{t('queue.post.actions.reject.modal.title')}</Text>
              <CloseButton isDisabled={isRejectingPost} onClick={onClose} right={0} />
            </Flex>
            <RejectionReasons
              infractions={props.infractions}
              onSubmit={onRejectPost}
              isModeratingPost={isRejectingPost}
            />
          </Flex>
        </Fade>
      </Flex>
    </>
  )
}
