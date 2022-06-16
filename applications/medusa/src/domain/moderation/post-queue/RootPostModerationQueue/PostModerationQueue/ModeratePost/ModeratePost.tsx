import type { ModeratePostApproveMutation } from '@//:artifacts/ModeratePostApproveMutation.graphql'
import type { ModeratePostRejectMutation } from '@//:artifacts/ModeratePostRejectMutation.graphql'
import { ConnectionHandler, graphql, useFragment } from 'react-relay'
import { useMutation } from 'react-relay/hooks'
import { Fade, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react'
import RejectionReasons from './RejectionReasons/RejectionReasons'
import type { ModeratePostFragment$key } from '@//:artifacts/ModeratePostFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'
import { t, Trans } from '@lingui/macro'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Icon } from '@//:modules/content/PageLayout'
import { CheckMark, RemoveCross } from '@//:assets/icons'

interface Props {
  infractions: RejectionReasonsFragment$key
  postID: ModeratePostFragment$key
  connectionID: string
}

const ModeratePostApproveGQL = graphql`
  mutation ModeratePostApproveMutation($input: ApprovePostInput!, $connections: [ID!]!) {
    approvePost(input: $input) {
      post {
        id @deleteEdge(connections: $connections)
      }
    }
  }
`

const ModeratePostRejectGQL = graphql`
  mutation ModeratePostRejectMutation($input: RejectPostInput!, $connections: [ID!]!) {
    rejectPost(input: $input) {
      post {
        id @deleteEdge(connections: $connections)
      }
    }
  }
`

const PostIDGQL = graphql`
  fragment ModeratePostFragment on Post {
    id
    club {
      name
    }
  }
`

export default function ModeratePost (props: Props): JSX.Element {
  const [approvePost, isApprovingPost] = useMutation<ModeratePostApproveMutation>(
    ModeratePostApproveGQL
  )

  const [rejectPost, isRejectingPost] = useMutation<ModeratePostRejectMutation>(
    ModeratePostRejectGQL
  )

  const data = useFragment(PostIDGQL, props.postID)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const notify = useToast()

  const onApprovePost = (): void => {
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
          title: t`Post created by ${data?.club?.name} was approved successfully`
        })
      },
      updater: (store, payload) => {
        if (payload?.approvePost?.post?.id != null) {
          const storyRecord = store.get(payload.approvePost.post.id)
          if (storyRecord != null) {
            const connectionRecord = ConnectionHandler.getConnection(
              storyRecord,
              'Posts_postModeratorQueue'
            )
            if (connectionRecord != null) {
              // Remove edge from the connection, given the ID of the node
              ConnectionHandler.deleteNode(
                connectionRecord,
                payload.approvePost.post.id
              )
            }
          }
        }
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error approving a post created by ${data?.club?.name}`
        })
      }
    })
  }
  const onRejectPost = (formData): void => {
    rejectPost({
      variables: {
        input: {
          postId: data.id,
          ruleId: formData.rejectionId,
          notes: formData.note
        },
        connections: [props.connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Post created by ${data?.club?.name} was successfully rejected`,
          isClosable: true
        })
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error rejecting the post created by ${data?.club?.name}`,
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <HStack w='100%' justify='flex-end' spacing={4}>
        <Button
          leftIcon={<Icon icon={RemoveCross} w={3} h={3} fill='orange.900' />}
          size='md'
          isDisabled={isApprovingPost}
          onClick={onOpen}
          colorScheme='orange'
          variant='solid'
        >
          <Trans>
            Reject
          </Trans>
        </Button>
        <Button
          size='md'
          leftIcon={<Icon icon={CheckMark} w={3} h={3} fill='green.900' />}
          isLoading={isApprovingPost}
          onClick={onApprovePost}
          colorScheme='green'
          variant='solid'
        >
          <Trans>
            Approve
          </Trans>
        </Button>
      </HStack>
      <Flex
        position='absolute'
        w='100%'
        h='100%'
        top={0}
        left={0}
        pointerEvents={isOpen ? 'initial' : 'none'}
      >
        <Fade style={{ zIndex: 2 }} in={isOpen}>
          <Flex
            p={4}
            direction='column'
            bg='dimmers.900'
            w='100%'
            h='100%'
            position='absolute'
            borderRadius='base'
            backdropFilter='blur(5px)'
          >
            <Flex align='center' w='100%' justify='space-between'>
              <Text fontSize='md' color='gray.100'>
                <Trans>
                  Select a reason for rejecting this post
                </Trans>
              </Text>
              <CloseButton
                size='sm'
                isDisabled={isRejectingPost}
                onClick={onClose}
                right={0}
              />
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
