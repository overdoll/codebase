import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import type {
  RevokeViewAuthenticationTokenButtonFragment$key
} from '@//:artifacts/RevokeViewAuthenticationTokenButtonFragment.graphql'
import { t, Trans } from '@lingui/macro'
import {
  RevokeViewAuthenticationTokenButtonMutation
} from '@//:artifacts/RevokeViewAuthenticationTokenButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import useGrantCleanup from '../support/useGrantCleanup'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { ArrowThickLeft } from '@//:assets/icons'

interface Props {
  query: RevokeViewAuthenticationTokenButtonFragment$key
}

const Fragment = graphql`
  fragment RevokeViewAuthenticationTokenButtonFragment on AuthenticationToken {
    token
  }
`

const Mutation = graphql`
  mutation RevokeViewAuthenticationTokenButtonMutation($input: RevokeAuthenticationTokenInput!) {
    revokeAuthenticationToken(input: $input) {
      revokedAuthenticationTokenId
    }
  }
`

export default function RevokeViewAuthenticationTokenButton (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const cancelButtonRef = useRef(null)

  const { i18n } = useLingui()

  const {
    onOpen,
    onClose,
    isOpen
  } = useDisclosure()

  const [revokeToken, isRevokingToken] = useMutation<RevokeViewAuthenticationTokenButtonMutation>(
    Mutation
  )

  const { invalidateGrant } = useGrantCleanup()

  const onRevokeToken = (): void => {
    revokeToken({
      variables: {
        input: {
          token: data.token
        }
      },
      onCompleted () {
        onClose()
      },
      updater: (store, payload) => {
        invalidateGrant(store, payload?.revokeAuthenticationToken?.revokedAuthenticationTokenId)
      }
    })
  }

  return (
    <>
      <IconButton
        aria-label={i18n._(t`Cancel`)}
        onClick={onOpen}
        icon={(
          <Icon
            icon={ArrowThickLeft}
            w={8}
            h={8}
            fill='gray.00'
          />)}
        variant='ghost'
        size='lg'
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
              Confirm Join Cancellation
            </Trans>
          </AlertDialogHeader>
          <AlertDialogCloseButton
            size='lg'
            as={CloseButton}
          />
          <AlertDialogBody>
            <Text>
              <Trans>
                If you cancel the joining flow, you'll be brought back to the initial login page and the link sent in
                the
                email will be invalidated. Are you sure?
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
              colorScheme='primary'
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
