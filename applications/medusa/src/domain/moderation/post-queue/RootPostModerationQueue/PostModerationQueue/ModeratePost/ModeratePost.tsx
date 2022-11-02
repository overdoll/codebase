import type { ModeratePostApproveMutation } from '@//:artifacts/ModeratePostApproveMutation.graphql'
import type { ModeratePostRejectMutation } from '@//:artifacts/ModeratePostRejectMutation.graphql'
import { ConnectionHandler, graphql, useFragment } from 'react-relay'
import { useMutation } from 'react-relay/hooks'
import { Fade, Flex, HStack, Stack, Text, useDisclosure } from '@chakra-ui/react'
import RejectionReasons from './RejectionReasons/RejectionReasons'
import type { ModeratePostFragment$key } from '@//:artifacts/ModeratePostFragment.graphql'
import Button from '@//:modules/form/Button/Button'
import { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'
import { t, Trans } from '@lingui/macro'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Icon } from '@//:modules/content/PageLayout'
import { CheckMark, RemoveCross } from '@//:assets/icons'
import UpdatePostCharactersModal from './UpdatePostCharactersModal/UpdatePostCharactersModal'

interface Props {
  infractions: RejectionReasonsFragment$key
  postID: ModeratePostFragment$key
}

const PostIDGQL = graphql`
  fragment ModeratePostFragment on PostModerator {
    id
    post {
      id
      club {
        name
      }
      characterRequests {
        __typename
      }
      characters {
        __typename
      }
      ...UpdatePostCharactersModalFragment
    }
  }
`

const ModeratePostApproveGQL = graphql`
  mutation ModeratePostApproveMutation($input: ApprovePostInput!) {
    approvePost(input: $input) {
      post {
        id
      }
    }
  }
`

const ModeratePostRejectGQL = graphql`
  mutation ModeratePostRejectMutation($input: RejectPostInput!) {
    rejectPost(input: $input) {
      post {
        id
      }
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

  const deleteNodeAfterApproval = (store): void => {
    const storyRecord = store
      .getRoot()
      .getLinkedRecord('viewer')
    if (storyRecord != null) {
      const connectionRecord = ConnectionHandler.getConnection(
        storyRecord,
        'Posts_postModeratorQueue'
      )
      if (connectionRecord != null) {
        ConnectionHandler.deleteNode(
          connectionRecord,
          data.id
        )
      }
    }
  }

  const onApprovePost = (): void => {
    approvePost({
      variables: {
        input: {
          postId: data.post.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Post created by ${data?.post.club?.name} was approved successfully`
        })
      },
      updater: (store) => {
        deleteNodeAfterApproval(store)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error approving a post created by ${data?.post?.club?.name}`
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
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Post created by ${data?.post.club?.name} was successfully rejected`,
          isClosable: true
        })
        onClose()
      },
      updater: (store) => {
        deleteNodeAfterApproval(store)
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error rejecting the post created by ${data?.post.club?.name}`,
          isClosable: true
        })
      }
    })
  }

  return (
    <>
      <Stack w='100%' align='flex-end' spacing={2}>
        {data.post.characterRequests.length > 0 && (
          <UpdatePostCharactersModal query={data.post} />
        )}
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
            isDisabled={data.post.characterRequests.length > 0}
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
      </Stack>
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
