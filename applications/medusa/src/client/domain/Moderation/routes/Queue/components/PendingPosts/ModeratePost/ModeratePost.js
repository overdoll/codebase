/**
 * @flow
 */
import type { Node } from 'react'
import type { ModeratePostMutation } from '@//:artifacts/ModeratePostMutation.graphql'
import { graphql, usePreloadedQuery, usePaginationFragment, useQueryLoader } from 'react-relay'
import { useMutation, PreloadedQuery } from 'react-relay/hooks'
import { Suspense, useEffect } from 'react'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { ModeratePostInfractionsQuery } from '@//:artifacts/ModeratePostInfractionsQuery.graphql'
import ErrorFallback from '../../../../../../../components/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'

type Props = {
  postId: string,
  refresh: () => void,
  query: PreloadedQuery<ModeratePostInfractionsQuery>
}

const ModeratePostGQL = graphql`
  mutation ModeratePostMutation($postId: String!, $reasonId: String, $notes: String!) {
    moderatePost(data: {pendingPostId: $postId, rejectionReasonId: $reasonId, notes: $notes}) {
      validation {
        code
      }
      auditLog {
        id
      }
    }
  }
`

const InfractionsGQL = graphql`
  query ModeratePostInfractionsQuery {
    rejectionReasons {
      id
      reason
      infraction
    }
  }
`

export default function Indexer ({ postId, refresh, query }: Props): Node {
  const [t] = useTranslation('moderation')

  const [moderatePost, isModeratingPost] = useMutation<ModeratePostMutation>(
    ModeratePostGQL
  )

  const [queryRef, loadQuery] = useQueryLoader<ModeratePostInfractionsQuery>(
    InfractionsGQL,
    query
  )

  useEffect(() => {
    loadQuery()
  }, [])

  const notify = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const approvePost = () => {
    moderatePost({
      variables: {
        postId: postId,
        notes: ''
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t('queue.post.actions.deny.query.success', { id: postId }),
          isClosable: true
        })
        refresh()
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.deny.query.error', { id: postId }),
          isClosable: true
        })
      }
    })
  }

  const denyPost = () => {

  }

  return (
    <>
      <HStack mt={6} justify='flex-end'>
        <Button size='lg' variant='ghost' colorScheme='orange' isLoading={isModeratingPost} onClick={onOpen}>
          {t('queue.post.actions.deny.button')}
        </Button>
        <Button size='lg' variant='outline' colorScheme='gray' isLoading={isModeratingPost} onClick={approvePost}>
          {t('queue.post.actions.approve.button')}
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='gray.900'>
          <ModalHeader fontSize='md'>{t('queue.post.actions.deny.modal.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
              )}
            >
              <Suspense fallback={<Skeleton />}>
                {queryRef
                  ? <RejectionReasons query={InfractionsGQL} queryRef={queryRef} />
                  : <Skeleton />}
              </Suspense>
            </ErrorBoundary>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

const RejectionReasons = (props) => {
  const data = usePreloadedQuery<ModeratePostInfractionsQuery>(
    props.query,
    props.queryRef
  )

  console.log(data)

  return (
    <></>
  )
}
