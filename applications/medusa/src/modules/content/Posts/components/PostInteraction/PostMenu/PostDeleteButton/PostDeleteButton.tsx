import { t, Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostDeleteButtonFragment$key } from '@//:artifacts/PostDeleteButtonFragment.graphql'
import { PostDeleteButtonMutation } from '@//:artifacts/PostDeleteButtonMutation.graphql'
import { useFragment, useMutation } from 'react-relay/hooks'
import { MenuItem } from '../../../../../ThemeComponents/Menu/Menu'
import { DeleteBin } from '@//:assets/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'
import CloseButton from '../../../../../ThemeComponents/CloseButton/CloseButton'
import { useRef } from 'react'
import { useHistoryDisclosure } from '../../../../../../hooks'
import Button from '../../../../../../form/Button/Button'
import { useToast } from '../../../../../ThemeComponents'
import { ConnectionProp } from '@//:types/components'

interface Props extends ConnectionProp {
  query: PostDeleteButtonFragment$key
}

const Fragment = graphql`
  fragment PostDeleteButtonFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation PostDeleteButtonMutation($input: DeletePostInput!, $connections: [ID!]!) {
    deletePost(input: $input) {
      postId @deleteEdge(connections: $connections)
    }
  }
`

export default function PostDeleteButton ({
  query,
  connectionId
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const cancelButtonRef = useRef(null)

  const [commit, isInFlight] = useMutation<PostDeleteButtonMutation>(Mutation)

  const {
    isOpen,
    onOpen,
    onClose
  } = useHistoryDisclosure()

  const notify = useToast()

  const onDelete = (): void => {
    commit({
      variables: {
        input: {
          id: data.id
        },
        connections: [connectionId]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Post was deleted successfully`
        })
        onClose()
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error deleting the post`
        })
      }
    })
  }

  return (
    <>
      <MenuItem
        onClick={onOpen}
        text={<Trans>Delete Post</Trans>}
        icon={DeleteBin}
        colorScheme='orange'
      />
      <AlertDialog
        preserveScrollBarGap
        isCentered
        leastDestructiveRef={cancelButtonRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Trans>
              Delete Post Confirmation
            </Trans>
          </AlertDialogHeader>
          <AlertDialogCloseButton
            size='lg'
            as={CloseButton}
          />
          <AlertDialogBody>
            <Trans>
              Are you sure you'd like to delete this post? You cannot undo this action and it will be gone forever.
            </Trans>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelButtonRef} variant='solid' size='lg' onClick={onClose}>
              <Trans>
                Cancel
              </Trans>
            </Button>
            <Button
              isLoading={isInFlight}
              onClick={onDelete}
              ml={3}
              size='lg'
              colorScheme='orange'
              variant='solid'
            >
              <Trans>
                Delete Post
              </Trans>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
