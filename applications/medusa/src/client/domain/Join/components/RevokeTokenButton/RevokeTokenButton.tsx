import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useRef } from 'react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text
} from '@chakra-ui/react'
import { SafetyExitDoorLeft } from '@//:assets/icons/navigation'
import type { RevokeTokenButtonFragment$key } from '@//:artifacts/RevokeTokenButtonFragment.graphql'
import { Trans } from '@lingui/macro'
import { RevokeTokenButtonMutation } from '@//:artifacts/RevokeTokenButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { useHistoryDisclosure } from '@//:modules/hooks'
import CloseButton from '@//:modules/form/CloseButton/CloseButton'

interface Props {
  queryRef: RevokeTokenButtonFragment$key
}

const Fragment = graphql`
  fragment RevokeTokenButtonFragment on AuthenticationToken {
    token
  }
`

const Mutation = graphql`
  mutation RevokeTokenButtonMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

export default function RevokeTokenButton ({
  queryRef
}: Props): JSX.Element {
  const data = useFragment(Fragment, queryRef)

  const cancelButtonRef = useRef(null)

  const {
    onOpen,
    onClose,
    isOpen
  } = useHistoryDisclosure()

  const [revokeToken, isRevokingToken] = useMutation<RevokeTokenButtonMutation>(
    Mutation
  )
  const onRevokeToken = (): void => {
    revokeToken({
      variables: {
        input: {
          token: data.token
        }
      },
      onCompleted () {
        onClose()
      }
    })
  }

  return (
    <>
      <Button
        leftIcon={<Icon w={4} h={4} icon={SafetyExitDoorLeft} fill='inherit' />}
        size='lg'
        onClick={onOpen}
      >
        <Trans>
          Cancel
        </Trans>
      </Button>
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
              Confirm Cancel Join
            </Trans>
          </AlertDialogHeader>
          <AlertDialogCloseButton
            size='lg'
            as={CloseButton}
          />
          <AlertDialogBody>
            <Text>
              <Trans>
                If you cancel the joining flow, you'll be brought back to the initial page and the link sent in the
                email
                will be invalidated. Are you sure?
              </Trans>
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelButtonRef}
              variant='solid'
              size='lg'
              onClick={onClose}
            >
              <Trans>
                Go back
              </Trans>
            </Button>
            <Button
              onClick={onRevokeToken}
              isLoading={isRevokingToken}
              ml={3}
              size='lg'
              colorScheme='green'
              variant='solid'
            >
              <Trans>
                Yes, cancel
              </Trans>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
