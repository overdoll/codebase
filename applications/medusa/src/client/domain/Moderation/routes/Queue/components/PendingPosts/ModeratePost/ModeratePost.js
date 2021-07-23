/**
 * @flow
 */
import type { Node } from 'react'
import { Suspense, useEffect } from 'react'
import type { ModeratePostMutation } from '@//:artifacts/ModeratePostMutation.graphql'
import { graphql, useQueryLoader } from 'react-relay'
import { PreloadedQuery, useMutation } from 'react-relay/hooks'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import type { ModeratePostInfractionsQuery } from '@//:artifacts/ModeratePostInfractionsQuery.graphql'
import ErrorFallback from '../../../../../../../components/ErrorFallback/ErrorFallback'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import RejectionReasons from './RejectionReasons/RejectionReasons'

type Props = {
  postId: string,
  refresh: () => void,
  query?: PreloadedQuery<ModeratePostInfractionsQuery>
}

const ModeratePostGQL = graphql`
  mutation ModeratePostMutation($input: ModeratePostInput!) {
    moderatePost(input: $input) {
      postAuditLog {
        id
      }
    }
  }
`

const InfractionsGQL = graphql`
  query ModeratePostInfractionsQuery {
    postRejectionReasons {
     edges {
       node {
         id
         reason
         infraction
       }
     }
    }
  }
`

export default function ModeratePost ({ postId, refresh, query }: Props): Node {
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
      onCompleted () {
        notify({
          status: 'success',
          title: t('queue.post.actions.approve.query.success', { id: postId }),
          isClosable: true
        })
        refresh()
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.approve.query.error', { id: postId }),
          isClosable: true
        })
      }
    })
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='gray.900'>
          <ModalHeader fontSize='lg'>{t('queue.post.actions.deny.modal.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
              )}
            >
              <Suspense fallback={<Skeleton />}>
                {queryRef
                  ? <RejectionReasons
                      isModeratingPost={isModeratingPost} moderatePost={moderatePost}
                      postId={postId} onClose={onClose} refresh={refresh}
                      query={InfractionsGQL} queryRef={queryRef}
                    />
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
